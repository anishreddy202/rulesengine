/* global console */

angular.module('rules.drafts')
  .controller('draftsIndexCtrl', function ($scope, $state, $stateParams, $filter, Draft, Messenger, CODES) {
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


    var draftIndex = function (id) {
      var draft = $filter('filter')($scope.collection, {id: id})[0];
      //var draft = $filter('filter')($scope.collection, function(draft){ draft.id === id; });
      return $scope.collection.indexOf(draft);
    };
    var getDrafts = function () {
      $scope.loading = true;
      $scope.collection = Draft.query(function(){
        $scope.loading = false;
      }, $scope.globalErrorCallback);
    };
    var deleteDraft = function (id) {
      Draft.delete({id: id}, function () {
        $scope.collection.splice(draftIndex(id), 1);
        $scope.richList.selected.splice(0, 1);
        if ($scope.richList.selected.length > 0) {
          var nxt_doc_id = $scope.richList.selected[0].id;
          deleteDraft(nxt_doc_id);
        } else {
          $scope.richList.filtered = $scope.collection;
          $scope.setSelectedItems();
        }
        return;
      }, $scope.globalErrorCallback);
    };

    $scope.duplicateDraft = function (id) {
      Draft.copy({source_id: id}, function (draft) {
        Messenger.send(CODES.draft_copy.success);
        $state.go('main.drafts.show.rulebuilder', {id: draft.id});
      }, function (err) {
        console.log(err);
        Messenger.send(CODES.draft_copy.error);
      });
    };

    $scope.onConfirmDelete = function () {
      $scope.selectedDrafts = $filter('filter')($scope.collection, function (draft) {
        return draft.selected === true;
      });
      if ($scope.selectedDrafts.length > 0) {
        deleteDraft($scope.selectedDrafts[0].id);
      }
    };
    $scope.init = function () {
      getDrafts();
    };
    $scope.init();
  });
