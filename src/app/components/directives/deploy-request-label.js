angular.module('rules.components.directives')
  .directive('deployRequestLabel', function () {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=item'
      },
      template: '<div class="label {{ state.labelClass }}">{{ state.name }}</div>',
      link: function (scope) {
        scope.state =  _.find(scope.$parent.STATES, { id: scope.item.state_id });
      }
    };
  }
);
