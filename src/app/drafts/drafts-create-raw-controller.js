angular.module('rules.drafts')
  .controller('draftsCreateRawCtrl', function ($scope, Translator) {
    'use strict';
    $scope.$parent.isRaw = true;
    $scope.$parent.xml = Translator.toXML($scope.$parent.rules);
  });
