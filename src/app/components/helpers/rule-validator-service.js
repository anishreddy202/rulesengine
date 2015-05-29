angular.module('rules.components.helper')
  .factory('RuleValidator', function ($location, $window, $filter, ENUMS, Helper) {
    'use strict';
    return {
      isAllRulesValid: function (rules) {
        var isValid = true;
        var self = this;
        for (var i = 0; i < rules.length; i++) {
          var rule =rules[i];
          var isaValidrule = self.isRuleValid(rule);
          if (!isaValidrule){
            isValid = false;
            rule.expanded = true;
          }
        }
        return isValid;
      },
      isRuleValid: function (rule) {
        var self = this;
        rule.errors = [];
        return self.isNodesValid(rule.nodes, rule.errors);
      },
      isNodesValid: function (nodes, errors) {
        var self = this, isValid = true;
        if (angular.isDefined(nodes) && nodes.length > 0) {
          angular.forEach(nodes, function(node){
            if (!self.isNodeValid(node, errors)) {
              isValid = false;
            }
          });
        } else {
          errors.push("rules must contain at least one feature");
          isValid = false;
        }
        return isValid;
      },
      isNodeValid: function (node, errors) {
        var self = this;
        if (angular.isDefined(node)){
          if(node.type === ENUMS.NODETYPE.SELECT){
            return self.isAValidSelectMatch(node, errors);
          }else if(node.type === ENUMS.NODETYPE.MATCH){
            return self.isAValidMatch(node);
          }else if(node.type === ENUMS.NODETYPE.FEATURE){
            return self.isAValidFeature(node);
          }
        }
        return false;
      },
      isAValidSelectMatch: function (selectNode, errors) {
        var self = this, isValid = true;
        selectNode.errors = [];
        if (angular.isDefined(selectNode) && selectNode.nodes.length > 0) {
          angular.forEach(selectNode.nodes, function(matchNode){
            if (self.isAValidMatch(matchNode) === false) {
              isValid = false;
            }
          });
        } else {
          isValid = false;
        }
        return isValid;
      },
      isAValidMatch: function (matchNode) {
        var self = this;
        var isAttributeValid = true, isNodeValid = true;
         matchNode.errors = [];
          if (angular.isDefined(matchNode)) {
            isAttributeValid = self.isAttributesValid(matchNode.attributes);
            if(!isAttributeValid){
              matchNode.errors.push("match '" + matchNode.name +  "' contains one or more invalid inputs");
            };
            if(matchNode.nodes && matchNode.nodes.length > 0){
              isNodeValid = self.isNodesValid(matchNode.nodes, matchNode.errors);
            } else {
              isNodeValid = false;
              matchNode.errors.push("rules must contain at least one feature");
            }
        }
        return (isAttributeValid === false || isNodeValid === false)?false:true;
      },
      isAValidFeature: function (featureNode) {
        var self = this;
        var isValid = false;
         featureNode.errors = [];
        if (angular.isDefined(featureNode)) {
          isValid = self.isAttributesValid(featureNode.attributes);
          if(!isValid){
            featureNode.errors.push("feature '" + featureNode.name + "' contains one or more invalid inputs");
          };
        };
        return isValid;
      },
      isAttributesValid: function (attributes) {
        var isValid = true;
        if (angular.isDefined(attributes) && attributes.length > 0) {//checks if its a valid condition or action
          angular.forEach(attributes, function (attr) {
            if(attr.type && attr.type.toLowerCase() === 'array' && attr.options.length > 0){
              var selectedOptions = $filter('filter')(attr.options, function (option) {
                return option.selected;
              });
              attr.isValid = selectedOptions.length > 0;
            } else {
              attr.isValid = Helper.validateRgx(attr.regex, attr.value, false);
            }
            if (!attr.isValid) {
              isValid = false;
            }
          });
        }
        return isValid;
      }
    };
  });
