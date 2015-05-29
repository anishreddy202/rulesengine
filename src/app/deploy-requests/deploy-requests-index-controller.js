angular.module('rules.deploy_requests')
  .controller('deployRequestsIndexCtrl', function ($scope, $state, $stateParams, $filter, DeployRequest) {
    'use strict';
    $scope.collection = [];
    $scope.loading = true;

    // Begin: handle bulk actions
    // TODO: this is hacky, should be a directive
    // also UX is unclear about selecting after filter
    $scope.richList = {
      bulkActionable: false,
      selected: [],
      filtered: [],
      query: ''
    };
    $scope.$watch('richList.query', function () {

      // TODO: should we remove selected from items filtered?
      $scope.setSelectedItems();
    });

    $scope.setSelectedItems = function () {
      $scope.richList.selected = $filter('filter')($scope.richList.filtered, function (item) {
        return(item.selected === true);
      });
      $scope.noItemsSelected = $scope.richList.selected.length === 0;
      $scope.allItemsSelected = $scope.richList.filtered.length && $scope.richList.selected === $scope.richList.filtered;
      $scope.someItemsSelected = !$scope.noItemsSelected && !$scope.allItemsSelected;
    };

    $scope.toggleAllItemsSelected = function(allSelected) {
      var item, _i, _len, _ref;
      _ref = $scope.richList.filtered;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.selected = allSelected;
      }
      $scope.setSelectedItems();
    };
    // End: handle bulk actions


    var deployRequestIndex = function (id) {
      var deployRequest = $filter('filter')($scope.collection, {id: id})[0];
      //var deployRequest = $filter('filter')($scope.collection, function(deployRequest){ deployRequest.id === id; });
      return $scope.collection.indexOf(deployRequest);
    };
    var getdeployRequests = function () {
      $scope.loading = true;
      $scope.collection = DeployRequest.query(function(){
        $scope.loading = false;
      }, $scope.globalErrorCallback);

    };
    var deleteDeployRequest = function (id) {
      DeployRequest.delete({ id: id }, function () {
        $scope.collection.splice(deployRequestIndex(id), 1);
        if ($scope.selectedItems) {
          $scope.selectedItems.splice(0, 1);
          if ($scope.selectedItems.length > 0) {
            var deleted_id = $scope.selectedItems[0].id;
            deleteDeployRequest(deleted_id);
          } else {
            $scope.selectedAll = false;
          }
        }
        return;
      }, $scope.glglobalErrorCallback);
    };

    $scope.duplicateDeployRequest = function (id) {
      DeployRequest.duplicate({ id: id }, function (deployRequest) {
        //Messenger.send(CODES.deployRequest_copy.success);
        $state.go('deployRequests.show.rulebuilder', {id: deployRequest.id});
      }, $scope.globalErrorCallback);
    };

    $scope.onConfirmDelete = function () {
      $scope.selecteddeployRequests = $filter('filter')($scope.collection, function (deployRequest) {
        return deployRequest.selected === true;
      });
      if ($scope.selecteddeployRequests.length > 0) {
        deleteDeployRequest($scope.selecteddeployRequests[0].id);
      }
    };
    $scope.init = function () {
      getdeployRequests();
    };
    $scope.init();
  });

