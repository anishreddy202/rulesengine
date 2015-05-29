var X2JS = X2JS || undefined;
var $ = $ || undefined;

angular.module('rules.components.translator', ['rules.components.helper'])
  .factory('Translator', function (Helper, $filter, ENUMS) {
    'use strict';
    var commentTag = 'c.o.m.m.e.n.t';
    var matchTemplates, featureTemplates;
    return {
      toXML: function (rules) {
        var self = this;
        var xml = { policy: {}};

        xml.policy.rules = {
          'rule': []
        };

        angular.forEach(rules, function (r) {
          var rule = {};
          if(angular.isDefined(r.description) && r.description.length > 0){
            rule.description = r.description;
          }

          if(r.comments){
            self.MapComments(r.comments, rule);
          }
          var nodes = self.MapNodesToXML(r, rule);
          $.extend(rule, nodes);
          xml.policy.rules.rule.push(rule);
        });
        var x2js = new X2JS({escapeMode: true});
        //console.log(JSON.stringify(xml));
        xml = x2js.json2xml_str(xml);
        xml = xml.replace(/<c.o.m.m.e.n.t>/g, '<!--');
        xml = xml.replace(/<\/c.o.m.m.e.n.t>/g, '-->');
        xml = xml.replace(/&#x2F;/g, '/');
        xml = Helper.formatXml(xml);

        return xml;
      },
      MapNodesToXML: function (node, rule) {
        var self = this;
        self.MapComments(node.comments, rule);
        var xmlTag = self.MapAttributesToXML(node.attributes);
        angular.forEach(node.nodes, function (n) {
          $.extend(xmlTag, self.MapNodesToXML(n, xmlTag));
        });
        if(node.tag){
          var xmlNode = rule[node.tag];
          if(angular.isUndefined(xmlNode)){
            rule[node.tag] = xmlTag;
          } else if(xmlNode instanceof Array){
            rule[node.tag].push(xmlTag);
          } else if(xmlNode instanceof Object){
            var nodeArray = [];
            nodeArray.push(xmlNode);
            nodeArray.push(xmlTag);
            rule[node.tag] = nodeArray;
          }
          return rule;
        }
        return xmlTag;
      },
      MapComments: function(comments, rule){
        if (comments && comments.length > 0) {
          var comment = {'c.o.m.m.e.n.t': comments};
          $.extend(rule, comment);
        }
      },
      MapAttributesToXML: function (attributes) {
        var tagObj = {};
        angular.forEach(attributes, function (attr) {
          var attrName = '_' + attr.key,
            type = attr.type? attr.type.toLowerCase() : undefined;
          if (type === 'array' && attr.options.length > 0) {
            var selectedOptions = $filter('filter')(attr.options, function (option) {
              return option.selected;
            });
            var selectedValue = selectedOptions.map(function (option) {
              return option.key;
            }).join(attr.delimiter);
            tagObj[attrName] = selectedValue;
          } else {
            tagObj[attrName] = (attr.value === undefined || attr.value === 'undefined') ? '' : attr.value;
          }
        });
        return tagObj;
      },
      setTemplates: function (match_templates, feature_templates) {
        matchTemplates = match_templates;
        featureTemplates = feature_templates;
      },
      toJSON: function (xmlStr) {
        var self = this;
        xmlStr = xmlStr.replace(/<!--/g, '<' + commentTag + '>');
        xmlStr = xmlStr.replace(/-->/g, '</' + commentTag + '>');
        var xml = Helper.xmlToJson(xmlStr);
        var rules = [];
        var xmlRules = [];
        if (xml.policy.rules.rule && xml.policy.rules.rule instanceof Array) {
          xmlRules = xml.policy.rules.rule;
        } else {
          xmlRules.push(xml.policy.rules.rule);
        }

        angular.forEach(xmlRules, function (xmlRule, $index) {
          if (xmlRule instanceof Object) {
            var rule = self.GetRuleTemplate($index + 1);
            rule.description = xmlRule.description;
            rule.comments = xmlRule[commentTag];
            rule.id = xmlRule._id;
            rule._id = Helper.Guid();
            rule.version = xmlRule._version;
            rule.nodes = [];
            self.MapNodes(xmlRule, rule);
            rules.push(rule);
          }
        });
        return rules;
      },
      MapNodes: function (rulexml, rule, tag) {
        var self = this, xmlNode = rulexml;
          for (var p in rulexml) {
            if (p.indexOf('select.') > -1 || p.indexOf('match.') > -1 || p.indexOf('feature.') > -1) {
              tag = p;
              xmlNode = rulexml[p];
              self.MapNodeObject(xmlNode, rule, tag);
            }
          }
      },
      MapNodeObject: function(xmlNode, rule, tag){
        var self = this;
        var node = self.getNodeTemplate(tag);
        if (angular.isDefined(node.type)) {
          if(node.type === ENUMS.NODETYPE.COMMENT){
            node.comments.push(xmlNode);
          } else {
            for (var prop in xmlNode) {
              if (prop.substring(0, 1) === '_') { //attributes starts with _
                var attribute = self.MapAttribute(node, prop, xmlNode);
                node.attributes.push(attribute);
              } else if(xmlNode[prop] instanceof Array){ //select first match
                angular.forEach(xmlNode[prop], function(n) {
                  self.MapNodeObject(n, node, prop);
                });
                node.comments = xmlNode[commentTag];
              } else {
                self.MapNodeObject(xmlNode[prop], node, prop);
              }
            }
            node.templates = undefined;
            rule.nodes.push(node);
          }
        }
      },
      MapNode: function(node, xmlNode){
        var self = this;
        for (var prop in xmlNode) {
          if (prop.substring(0, 1) === '_') { //attributes starts with _
            var attribute = self.MapAttribute(node, prop, xmlNode);
            node.attributes.push(attribute);
          } else {
            self.MapNodeObject(xmlNode[prop], node, prop);
          }
        }
      },
      getNodeTemplate: function(tag){
        var node = {}, available_templates = [];
        node.id = Helper.Guid();
        node.nodes = [];
        node.comments = [];
        node.templates = [];
        node.type = tag.indexOf('select.') > -1 ? ENUMS.NODETYPE.SELECT :
              tag.indexOf('match.') > -1 ? ENUMS.NODETYPE.MATCH :
              tag.indexOf('feature.') > -1 ? ENUMS.NODETYPE.FEATURE :
              tag.indexOf(commentTag) > -1 ? ENUMS.NODETYPE.COMMENT : undefined;

        if (node.type === ENUMS.NODETYPE.MATCH) {
          available_templates = $filter('filter')(matchTemplates, function (item) {
            return item.tag === tag;
          });
        } else if (node.type === ENUMS.NODETYPE.FEATURE) {
          available_templates = $filter('filter')(featureTemplates, function (item) {
            return item.tag === tag;
          });
        } else if(node.type === ENUMS.NODETYPE.SELECT){
          node.tag = 'select.first-match';
          node.name = 'Select First Match';
        }
        if(available_templates.length > 0 ){
          $.extend(node, available_templates[0]);
        }
        node.templates = angular.copy(node.attributes);
        node.attributes = [];
        return node;
      },
      MapAttribute: function (node, attrName, xmlNode) {
        var key_prop = attrName.substring(1); // eliminate _
        var matching_attributes = $filter('filter')(node.templates, function (attr) {
          return attr.key === key_prop;
        });
        var attribute;
        if (matching_attributes && matching_attributes.length > 0) {
          attribute = angular.copy(matching_attributes[0]);
          attribute.value = xmlNode[attrName];
        } else {
          //attribute not available in the dictionary
          attribute = {key: key_prop, name: key_prop, value: xmlNode[attrName]};
          attribute.id = Helper.Guid();
          //node.attributes.push(attribute);
        }
        return attribute;
      },
      GetRuleTemplate: function (index) {
        var newRule = {};
        newRule._id = Helper.Guid();
        newRule.name = 'Rule ' + index;
        newRule.comments = [];
        newRule.description = undefined;
        return newRule;
      }
    };
  });
