/* global console */

angular.module('rules.policies')
  .controller('policiesIndexCtrl', function ($scope, $state, $stateParams, $filter, Policy, Messenger, CODES) {
    'use strict';
    $scope.collection = [];
    $scope.loading = false;

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

    $scope.filterRichList = function(filterParam){
      var key, value;
      for(var i in filterParam){
        key = i;
        value = filterParam[i];
      }
      return function(item){
        if(!value){
          return !item[key] ||  item[key] === value ;
        }
        return item[key] === value;
      }
    }

    $scope.setSelectedItems = function () {
      $scope.richList.selected = $filter('filter')($scope.richList.filtered, function (item) {
        return (item.selected === true);
      });
      $scope.noItemsSelected = $scope.richList.selected.length === 0;
      $scope.allItemsSelected = $scope.richList.filtered.length && $scope.richList.selected === $scope.richList.filtered;
      $scope.someItemsSelected = !$scope.noItemsSelected && !$scope.allItemsSelected;
    };

    $scope.toggleAllItemsSelected = function (allSelected) {
      var item, _i, _len, _ref;
      _ref = $scope.richList.filtered;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.selected = allSelected;
      }
      $scope.setSelectedItems();
    };
    // End: handle bulk actions


    var policyIndex = function (id) {
      var policy = $filter('filter')($scope.collection, {id: id})[0];
      return $scope.collection.indexOf(policy);
    };
    var getpolicies = function () {
      $scope.loading = true;
      $scope.collection = Policy.query(function(){
        $scope.loading = false;
      }, $scope.globalErrorCallback);
    };
    var deletePolicy = function (id) {
      Policy.delete({id: id}, function () {
        $scope.collection.splice(policyIndex(id), 1);
        $scope.richList.selected.splice(0, 1);
        if ($scope.richList.selected.length > 0) {
          var nxt_doc_id = $scope.richList.selected[0].id;
          deletePolicy(nxt_doc_id);
        } else {
          $scope.richList.filtered = $scope.collection;
          $scope.setSelectedItems();
        }
        return;
      }, $scope.globalErrorCallback);
    };

    $scope.duplicatePolicy = function (id) {
      Policy.copy({source_id: id}, function (draft) {
        Messenger.send(CODES.policy_copy.success);
        $state.go('main.drafts.show.rulebuilder', {id: draft.id});
      }, function (err) {
        console.log(err);
        Messenger.send(CODES.draft_copy.error);
      });
    };

    $scope.onConfirmDelete = function () {
      $scope.selectedpolicies = $filter('filter')($scope.collection, function (policy) {
        return policy.selected === true;
      });
      if ($scope.selectedpolicies.length > 0) {
        deletePolicy($scope.selectedpolicies[0].id);
      }
    };
    $scope.init = function () {
      getpolicies();
    };
    $scope.init();
  });
