angular.module('rules.components.directives')
    .directive('validatorMsg', function (Helper, Messenger, CONST) {
        'use strict';
        return {
            restrict: 'E',
            scope:{
              errors: '=errors'
            },
            templateUrl: '/rules/components/directives/validator-msg.html',
            link: function (scope) {

            }
        };
    });
