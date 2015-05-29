angular.module('rules.components.messenger', [])
  .factory('Messenger', function () {
    'use strict';
    var data;
    return {
      send: function (value) {
        data = value;
      },
      check: function () {
        var _data = data;
        data = undefined;
        return _data;
      }
    };
  });
