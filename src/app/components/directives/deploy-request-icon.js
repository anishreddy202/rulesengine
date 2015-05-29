angular.module('rules.components.directives')
  .directive('deployRequestIcon', function () {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=item'
      },
      template: '<i class="fa {{ state.iconClass }}"></i>',
      link: function (scope) {
        scope.state =  _.find(scope.$parent.STATES, { id: scope.item.state_id });
      }
    };
  }
);
