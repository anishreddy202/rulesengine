var $ = $ || undefined;

angular.module('rules.components.directives')
    .directive('popOver', function () {
        'use strict';
        return {
            restrict: 'A',
            link: function (scope, element) {
              $(element).popover({placement:'top',trigger:'hover', html : true});
            }
        };
    });
