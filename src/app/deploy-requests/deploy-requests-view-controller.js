angular.module('rules.deploy_requests')
  .controller('deployRequestViewCtrl', function ($scope, $state, $stateParams, $filter, $window, DeployRequest, Policy, Translator, Messenger, Helper, CONST, CODES) {
    'use strict';
    $scope.xml = '';
    $scope.prevRequestXML = undefined;
    $scope.prevRequest = undefined;
    $scope.prevPolicy = undefined;
    $scope.viewMode = true;
    $scope.pageLoading = true;

    var getDeployRequest = function (id) {
        DeployRequest.get({id: id}, function (dr) {
        $scope.deployRequest = dr;
        //gets policy xml
        Policy.get({id: dr.policy_id }, function(doc){
          $scope.policy = doc;
          $scope.deployRequest.policy_name = doc.name;
          $scope.pageLoading = false;
          $scope.prevRequestXML = $scope.xml =  Helper.formatXml(doc.body);
        }, function (err) {
          $scope.pageLoading = false;
          $scope.globalErrorCallback(err);
        });

        //gets previously deployed policy xml
        DeployRequest.query({environment_id: dr.environment_id}, function(reqs){
          var reqs_sorted = $filter('orderBy')(reqs,'updated_at');
          var prev_req;
          angular.forEach(reqs_sorted, function(oldReq){
            if(dr.updated_at === oldReq.updated_at) {
              if(prev_req) {
                $scope.prevRequest = prev_req;
              }
              return;
            }
            prev_req = oldReq;
          });
          if($scope.prevRequest){
            Policy.get({id: $scope.prevRequest.policy_id }, function(doc){
              $scope.prevPolicy = doc;
              $scope.prevRequestXML =  Helper.formatXml(doc.body);
            });
          }
        });
      }, function (err) {
          $scope.pageLoading = false;
          $scope.globalErrorCallback(err);
        });
    };

    $scope.back = function () {
      Helper.goBack();
    };
    $scope.onConfirmDelete = function(){
      $scope.pageLoading = true;
      var cancelRequest = angular.copy($scope.deployRequest);
      cancelRequest.state_id = 7; //cancelled
      DeployRequest.update(cancelRequest, function(){
        $scope.init();
        $scope.pageLoading = false;
        $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.deploy_request_cancel.success);
      }, function(err){
        $scope.pageLoading = false;
        console.log(err);
        $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.deploy_request_cancel.error);
      });
    };
    $scope.init = function () {
      if($stateParams.id){
        $scope.deployRequest = undefined;
        $scope.deployRequests = DeployRequest.query();
        getDeployRequest($stateParams.id);
      }
    };
    $scope.init();
  });
