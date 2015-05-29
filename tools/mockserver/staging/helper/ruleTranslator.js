(function() {
  var Rule2Xml, RulesTranslator, Xml2Rule, XmlWriter, fastReturn, prt, prtj, sax,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  sax = this.sax;

  if (sax == null) {
    sax = require('sax');
  }

  fastReturn = function(cb, arg) {
    return setTimeout((function() {
      return cb(arg);
    }), 0);
  };

  prt = function(s) {
    return console.log(s);
  };

  prtj = function(o) {
    return prt(JSON.stringify(o, null, '  '));
  };

  RulesTranslator = (function() {
    function RulesTranslator() {}

    RulesTranslator.prototype.xml2js = function(xmlDocument, cb) {
      var xlator;
      xlator = new Xml2Rule();
      return xlator.convertDocument(xmlDocument, cb);
    };

    RulesTranslator.prototype.js2xml = function(ruleArray, cb) {
      var xlator;
      xlator = new Rule2Xml();
      return xlator.convertRules(ruleArray, cb);
    };

    return RulesTranslator;

  })();

  Xml2Rule = (function() {
    function Xml2Rule() {
      this.text = __bind(this.text, this);
      this.closetag = __bind(this.closetag, this);
      this.opentag = __bind(this.opentag, this);
      this.parser = sax.parser(true);
      this.init();
      this.rules = [];
    }

    Xml2Rule.prototype.init = function() {
      this.parser.onerror = function(e) {
        prt("Error occurred: " + e);
        return process.exit(1);
      };
      this.parser.onopentag = this.opentag;
      this.parser.onclosetag = this.closetag;
      return this.parser.ontext = this.text;
    };

    Xml2Rule.prototype.newRule = function(withDescription) {
      this.matches.push(0);
      if (withDescription) {
        return {
          description: null,
          "if": [],
          then: [],
          "else": null
        };
      } else {
        return {
          "if": [],
          then: [],
          "else": null
        };
      }
    };

    Xml2Rule.prototype.copyAttributes = function(node, obj) {
      var name, value, _ref;
      _ref = node.attributes;
      for (name in _ref) {
        value = _ref[name];
        obj[name] = value;
      }
      return obj;
    };

    Xml2Rule.prototype.closerules = function(name) {
      return fastReturn(this.cb, this.rules);
    };

    Xml2Rule.prototype.openrule = function(node) {
      this.matches = [];
      this.rule = this.currentRule = this.newRule(true);
      return this.copyAttributes(node, this.rule);
    };

    Xml2Rule.prototype.closerule = function(name) {
      this.rules.push(this.rule);
      return this.rule = this.currentRule = this.newRule();
    };

    Xml2Rule.prototype.closedescription = function(name) {
      return this.rule.description = this.currentText;
    };

    Xml2Rule.prototype.addNode = function(node, array) {
      var name, obj, value, _ref;
      obj = {
        tag: node.name
      };
      _ref = node.attributes;
      for (name in _ref) {
        value = _ref[name];
        obj[name] = value;
      }
      return array.push(obj);
    };

    Xml2Rule.prototype.openselect = function(node) {
      var newRule;
      if (this.currentRule["if"].length > 0) {
        newRule = this.newRule();
        this.currentRule.then.push(newRule);
        this.currentRule = newRule;
      }
      return this.matches.push(0);
    };

    Xml2Rule.prototype.closeselect = function(name) {
      return this.matches.pop();
    };

    Xml2Rule.prototype.numMatches = function() {
      var i;
      i = this.matches.length - 1;
      return this.matches[i];
    };

    Xml2Rule.prototype.incrMatches = function() {
      var i;
      i = this.matches.length - 1;
      return this.matches[i]++;
    };

    Xml2Rule.prototype.decrMatches = function() {
      var i;
      i = this.matches.length - 1;
      return this.matches[i]--;
    };

    Xml2Rule.prototype.openmatch = function(node) {
      var newRule;
      if (this.numMatches() > 0) {
        if (this.currentRule.then.length > 0) {
          newRule = this.newRule();
          this.currentRule.then.push(newRule);
          this.currentRule = newRule;
        }
      } else {
        if (this.currentRule["if"].length === 0) {

        } else {
          newRule = this.newRule();
          this.currentRule["else"] = newRule;
          this.currentRule = newRule;
        }
      }
      this.addNode(node, this.currentRule["if"]);
      return this.incrMatches();
    };

    Xml2Rule.prototype.closematch = function(name) {
      return this.decrMatches();
    };

    Xml2Rule.prototype.openfeature = function(node) {
      return this.addNode(node, this.currentRule.then);
    };

    Xml2Rule.prototype.closefeature = function(name) {};

    Xml2Rule.prototype.opentag = function(node) {
      var name, _name;
      name = node.name.replace(/\..*$/, '');
      return typeof this[_name = "open" + name] === "function" ? this[_name](node) : void 0;
    };

    Xml2Rule.prototype.closetag = function(name) {
      var _name;
      name = name.replace(/\..*$/, '');
      return typeof this[_name = "close" + name] === "function" ? this[_name](name) : void 0;
    };

    Xml2Rule.prototype.text = function(str) {
      return this.currentText = str;
    };

    Xml2Rule.prototype.convertDocument = function(docStr, cb) {
      this.cb = cb;
      if (docStr != null) {
        return this.parser.write(docStr);
      } else {
        return fastReturn(this.cb, null);
      }
    };

    return Xml2Rule;

  })();

  XmlWriter = (function() {
    function XmlWriter() {
      this.elements = [];
      this.xml = '';
      this.indent = 0;
    }

    XmlWriter.prototype.indented = function() {
      var str, _i, _ref;
      str = "";
      for (_i = 0, _ref = this.indent; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
        str += " ";
      }
      return str;
    };

    XmlWriter.prototype.addElement = function(name, attrMap, content) {
      var attrStr, key, xml;
      this.elements.push(name);
      attrStr = '';
      xml = '';
      for (key in attrMap) {
        attrStr += "" + key + "=\"" + attrMap[key] + "\" ";
      }
      if (attrStr.trim().length > 0) {
        attrStr = ' ' + attrStr.trim();
      }
      if (content != null) {
        this.xml += "" + (this.indented()) + "<" + name + attrStr + ">" + content + "\r\n";
      } else {
        this.xml += "" + (this.indented()) + "<" + name + attrStr + ">\r\n";
      }
      return this.indent++;
    };

    XmlWriter.prototype.closeElement = function() {
      var element;
      element = this.elements.pop();
      this.indent--;
      return this.xml += "" + (this.indented()) + "</" + element + ">\r\n";
    };

    return XmlWriter;

  })();

  Rule2Xml = (function() {
    function Rule2Xml() {}

    Rule2Xml.prototype.convertRules = function(ruleArray, cb) {
      var rule, _i, _len;
      this.w = new XmlWriter();
      this.w.addElement("rules");
      for (_i = 0, _len = ruleArray.length; _i < _len; _i++) {
        rule = ruleArray[_i];
        this.w.addElement("rule");
        this.addRuleXml(rule, false);
        this.w.closeElement();
      }
      this.w.closeElement();
      return fastReturn(cb, this.w.xml);
    };

    Rule2Xml.prototype.featureIsRule = function(feature) {
      return (feature != null ? feature["if"] : void 0) != null;
    };

    Rule2Xml.prototype.addRuleXml = function(rule, selectNesting) {
      var exprCounter, feature, match, _i, _j, _k, _len, _len1, _ref, _ref1;
      exprCounter = 0;
      if ((rule["else"] != null) && !selectNesting) {
        this.w.addElement('select.first-match');
      }
      _ref = rule["if"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        this.addItemXml(match);
        exprCounter++;
      }
      _ref1 = rule.then;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        feature = _ref1[_j];
        if (this.featureIsRule(feature)) {
          this.addRuleXml(feature, false);
        } else {
          this.addItemXml(feature);
          this.w.closeElement();
        }
      }
      for (_k = 1; 1 <= exprCounter ? _k <= exprCounter : _k >= exprCounter; 1 <= exprCounter ? _k++ : _k--) {
        this.w.closeElement();
      }
      if (rule["else"] != null) {
        this.addRuleXml(rule["else"], true);
        if (!selectNesting) {
          return this.w.closeElement();
        }
      }
    };

    Rule2Xml.prototype.addItemXml = function(item) {
      var tag;
      tag = item.tag;
      delete item.tag;
      return this.w.addElement(tag, item);
    };

    return Rule2Xml;

  })();

  RulesTranslator = (function() {
    function RulesTranslator() {}

    RulesTranslator.prototype.xml2js = function(xmlDocument, cb) {
      var xlator;
      xlator = new Xml2Rule();
      return xlator.convertDocument(xmlDocument, cb);
    };

    RulesTranslator.prototype.js2xml = function(ruleArray, cb) {
      var xlator;
      xlator = new Rule2Xml();
      return xlator.convertRules(ruleArray, cb);
    };

    return RulesTranslator;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).RulesTranslator = RulesTranslator;

}).call(this);
