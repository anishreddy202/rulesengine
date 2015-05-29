var X2JS = X2JS || undefined;

angular.module('rules.components.helper', ['ngResource'])
  .factory('Helper', function ($location, $window, $filter) {
    'use strict';
    return {
      goBack: function () {
        $window.history.back();
      },
      Guid: function () {
        return (((1 + Math.random()) * 0x10000)).toString(16).substring(1, 5);
      },
      IsGHPage: function () {
        return $location.$$host.indexOf('edgecastcdn.net') >= 0;
      },
      validateRgx: function (rgx, value, isRequired) {
        if(angular.isDefined(rgx)){
          try {
            var regexp = new RegExp(rgx);
            if(isRequired){
              return (/([^\s])/).test(value) && regexp.test(value);
            }
            return regexp.test(value);
          }
          catch(e) {
            //invalid regex
            return true;
          }
        }
        return true;
      },
      getItemByKey: function (collection, key, value) {
        var items = $filter('filter')(collection, function (c) {
          return c[key] === value;
        });
        return items && items[0];
      },
      isBoolean: function (value) {
        if (angular.isDefined(value)) {
            return typeof(value) === 'boolean' || value === 'true' || value === 'false' ||
              value === 'True' || value === 'False' || value === 'TRUE' || value === 'FALSE';
        }
        return false;
      },
      xmlToString: function (xml) {
        return xml.replace(/\n\s*/g, '');
      },
      xmlToJson: function (xml) {
        var x2js = new X2JS();
        var xmlDoc = x2js.parseXmlString(xml);
        var jsonDto = x2js.xml2json(xmlDoc);
        return jsonDto;
      },
      formatXml: function (xml) {
        var reg = /(>)(<)(\/*)/g;
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
        var transitions = {
          'single->single': 0,
          'single->closing': -1,
          'single->opening': 0,
          'single->other': 0,
          'closing->single': 0,
          'closing->closing': -1,
          'closing->opening': 0,
          'closing->other': 0,
          'opening->single': 1,
          'opening->closing': 0,
          'opening->opening': 1,
          'opening->other': 1,
          'other->single': 0,
          'other->closing': -1,
          'other->opening': 0,
          'other->other': 0
        };

        for (var i = 0; i < lines.length; i++) {
          var ln = lines[i];
          var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
          var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
          var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
          var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
          var fromTo = lastType + '->' + type;
          lastType = type;
          var padding = '';

          indent += transitions[fromTo];
          for (var j = 0; j < indent; j++) {
            padding += '    ';
          }

          formatted += padding + ln + '\n';
        }

        return formatted;
      }
    };
  });
