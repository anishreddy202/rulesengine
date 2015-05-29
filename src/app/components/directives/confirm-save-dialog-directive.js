angular.module('rules.components.directives')
  .directive('confirmSaveDialog', function ($state) {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: '/rules/components/directives/confirm-save-dialog.html',
      link: function(scope){
        var toStateValue, toStateParams;
        scope.proceedStateRouting = function () {
          scope.cancelEditing(scope.rulecache);
          $state.go(toStateValue, toStateParams);
        };
        scope.$on('$stateChangeStart', function (event, toState, toParams) {
          if (scope.isRuleDirty()) {
            toStateValue = toState;
            toStateParams = toParams;
            $('#confirmSaveModal').modal('show');
            event.preventDefault();
          }
        });
      }
    };
  });
