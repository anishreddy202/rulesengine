angular.module('rules.components.directives')
    .directive('alertMsg', function (Helper, Messenger, CONST) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: '/rules/components/directives/alert-msg.html',
            link: function (scope) {
              scope.message = Messenger.check();
              scope.$on(CONST.EVENTS.INSTANT_MESSAGING, function (e, message) {
                console.log(message);
                scope.message = message;
              });
            }
        };
    });
