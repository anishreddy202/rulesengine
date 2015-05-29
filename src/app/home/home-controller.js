angular.module('rules.home')
  .controller('homeCtrl', function ($scope, $state, $filter, Policy, Draft, DeployRequest, Helper, CONFIG) {
    'use strict';
    $scope.loading=true;
    $scope.deployRequests = DeployRequest.query(function (res) {
      $scope.loading=false;
    }, $scope.globalErrorCallback);
    $scope.recentItemsCap = CONFIG.recentItemsCap;
  });
