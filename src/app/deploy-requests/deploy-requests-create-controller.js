/* global console */

angular.module('rules.deploy_requests')
  .controller('deployRequestsCreateCtrl', function ($scope, $state, $stateParams, $filter, $window, DeployRequest, Policy, Translator, Messenger, Helper, CODES, CONST) {
    'use strict';
    $scope.deployRequest = {};
    $scope.xml = '';
    $scope.prevRequestXML = undefined;
    $scope.prevPolicy = undefined;
    $scope.rules = [];
    $scope.createMode = true;

    var getDeployRequests = function () {
      DeployRequest.query(function (res) {

        $scope.deployRequestInProduction = _.chain(res)
          .where({ environment_id: 1, state_id: 4 })
          .sortBy('updated_at')
          .last()
          .value() || null;

        if ($scope.deployRequestInProduction) {
          Policy.get({ id: $scope.deployRequestInProduction.policy_id }, function (policy) {
            $scope.deployRequestInProduction.policy = policy;
            console.log('Deploy Request In Production', $scope.deployRequestInProduction);
          }, $scope.globalErrorCallback);
        }

        $scope.deployRequestInStaging = _.chain(res)
          .where({ environment_id: 2, state_id: 4 })
          .sortBy('updated_at')
          .last()
          .value() || null;

        if ($scope.deployRequestInStaging) {
          Policy.get({ id: $scope.deployRequestInStaging.policy_id }, function (policy) {
            $scope.deployRequestInStaging.policy = policy;
            console.log('Deploy Request In Staging', $scope.deployRequestInStaging);
          }, $scope.globalErrorCallback);
        }

      }, $scope.globalErrorCallback);
    };
    var getPolicy = function (id) {
      Policy.get({id: id}, function (res) {
        var xml = res.body;
          $scope.policy = res;
          $scope.xml = Helper.formatXml(xml);
          $scope.prevRequestXML = '-1';
      }, $scope.globalErrorCallback);
    };
    $scope.selectEnvironment = function(env, oldDoc){
      $scope.deployRequest.environment_id = env;
      if(oldDoc && oldDoc.policy){
        $scope.prevPolicy = oldDoc.policy;
        $scope.prevRequestXML = Helper.formatXml(oldDoc.policy.body);
      } else {
        $scope.prevPolicy = undefined;
        $scope.prevRequestXML = $scope.xml;
      }
    };

    $scope.back = function () {
      Helper.goBack();
    };
    $scope.submit = function () {
      $scope.deployRequest.policy_id = parseInt($stateParams.id);
      if($scope.prevPolicy && $scope.deployRequest.policy_id === $scope.prevPolicy.id){
        //same policy being pushed
        var warning = CODES.deploy_request_save.warning;
        warning.text = 'The policy you are trying to deploy is already active in ' + (($scope.deployRequest.environment_id === 1)?'Production.':'Staging.');
        $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, warning);
        return;
      }
      $scope.$broadcast(CONST.EVENTS.KICKOFF_VALIDATIONS, CODES.deploy_request_save.warning);
      if ($scope.deployForm.$invalid) {
        return;
      }
      DeployRequest.create($scope.deployRequest, function (req) {
        Messenger.send(CODES.deploy_request_save.success);
        $state.go('main.deploy_requests.show',{ id: req.id });
      }, function (err) {
        console.log(err);
        //Messenger.send(CODES.deploy_request_save.error);
        $scope.globalErrorCallback(err);
      });
    };
    $scope.init = function () {
      $scope.deployRequest.policy_id = $stateParams.id;
      getDeployRequests();
      getPolicy($stateParams.id);
    };
    $scope.init();
  });
