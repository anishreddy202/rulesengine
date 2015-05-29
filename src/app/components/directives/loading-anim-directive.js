angular.module('rules.components.directives')
    .directive('loadingAnim', function (Helper, Messenger, CONST) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: '/rules/components/directives/loading-anim.html',
            link: function (scope) {

            }
        };
    });
