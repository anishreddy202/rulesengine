var $ = $ || undefined;

angular.module('rules.components.directives')
  .directive('requireInput', function (CONST) {
  'use strict';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var validator = function (viewValue) {
        if (CONST.REGEX.REQUIRED.test(viewValue)) {
          ctrl.$setValidity('requireInput', true);
          return viewValue;
        } else {
          ctrl.$setValidity('requireInput', false);
          return undefined;
        }
      };
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.unshift(validator);
      scope.$on(CONST.EVENTS.KICKOFF_VALIDATIONS, function (e, message) {
        scope.$blurred = true;
        var isValid = validator(element.val());
        if(!isValid) {
          scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, message);
        }
        $(element).focus();
      });
    }
  };
});
