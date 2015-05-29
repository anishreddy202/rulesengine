angular.module('rules.components.directives')
  .directive('confirmDialog', function () {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        items: '=',
        title:'@'
      },
      templateUrl: '/rules/components/directives/confirm-delete-dialog.html',
      link: function(scope){
        if(scope.items instanceof Array){
          scope.itemsType = 'Array';
        } else {
          scope.itemsType = 'Object';
        }
      }
    };
  });
