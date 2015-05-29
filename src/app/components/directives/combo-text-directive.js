angular.module('rules.components.directives')
  .directive('comboText', function () {
    'use strict';
    return {
      restrict: 'E',
      scope:{
        attr:'='
      },
      templateUrl: '/rules/components/directives/combo-text.html',
      link: function (scope) {
        var attr = scope.attr;
        var value = attr.value;
        if(attr.options){
          for(var i=0;i<attr.options.length -1;i++){ //looks for the matching option and make it selected.
            var option = attr.options[i];
            if(value.indexOf(option.key) >=0){
              attr.selected = option;
              attr.txt_value = value.split(option.key)[1];
              return;
            }
          }
        }
      }
    };
  });
