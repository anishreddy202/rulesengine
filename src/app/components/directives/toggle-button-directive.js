angular.module('rules.components.directives')
  .directive('toggleButton', function ($state) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element,attr){
        var toggle = attr.defaultState === 'state1'?true: false;
        scope.targetIcon = toggle ? attr.icon2 : attr.icon1;
        element.bind('click', function(){
          scope.targetState = toggle ? attr.state2 : attr.state1;
          toggle = !toggle;
          scope.targetIcon = toggle ? attr.icon2 : attr.icon1;
          $state.go(scope.targetState);
        });
      }
    };
  });
