/* global console */

angular.module('rules.policies')
  .controller('policiesViewCtrl', function ($scope, $state, $filter, match_templates, feature_templates, CATEGORY_TYPES, CATEGORIES, $stateParams, Translator, Policy, DeployRequest, Helper, Messenger, CODES) {
    'use strict';

    $scope.policy = {};
    $scope.draft = {};
    $scope.deployRequest = {};
    $scope.actions = [];
    $scope.current_rule = undefined;
    $scope.$state = $state;
    $scope.$root.draftView = false;
    $scope.pageLoading = true;
    $scope.rules=[];

    if(angular.isDefined(match_templates.error) || angular.isDefined(feature_templates.error)){
      $state.go('error');
    };
    $scope.matches = match_templates;
    $scope.features = feature_templates;
    //todo: find a way to get this into state resolve
    Translator.setTemplates(match_templates, feature_templates);
    var match_category_type = $filter('filter')(CATEGORY_TYPES, function(c){ return c.name.indexOf('Match') >= 0;})[0];
    var feature_category_type = $filter('filter')(CATEGORY_TYPES, function(c){ return c.name.indexOf('Feature') >= 0;})[0];
    $scope.match_categories = $filter('filter')(CATEGORIES, function(c){ return c.category_type_id === match_category_type.id;});
    $scope.feature_categories = $filter('filter')(CATEGORIES, function(c){ return c.category_type_id === feature_category_type.id;});

    var getPolicy = function (id) {
      $scope.draft = $scope.policy = Policy.get({id: id}, function (res) {
        var xml = res.body;
        $scope.xml = Helper.formatXml(xml);
        $scope.rules = Translator.toJSON(xml);
        $scope.pageLoading = false;
      }, function (err) {
        $scope.pageLoading = false;
        $scope.globalErrorCallback(err);
      });
    };
    $scope.onConfirmDelete = function () {
      console.log("Archive call")
      Policy.archive({id: $scope.policy.id}, function () {
        console.log("Archived policy")
        Messenger.send(CODES.policy_delete.success);
        $state.go('main.policies.index');
      }, function (err) {
        $scope.pageLoading = false;
        console.log(err);
        Messenger.send(CODES.policy_delete.error);
      });
    };
    $scope.duplicatePolicy = function () {
      $scope.pageLoading = true;
      var id = $scope.policy.id;
      Policy.copy({source_id: id}, function (draft) {
        $scope.pageLoading = false;
        Messenger.send(CODES.policy_copy.success);
        $state.go('main.drafts.show.rulebuilder', {id: draft.id});
      }, function (err) {
        $scope.pageLoading = false;
        console.log(err);
        Messenger.send(CODES.draft_copy.error);
      });
    };
    $scope.init = function () {
      if ($stateParams.id) {
        getPolicy($stateParams.id);
      }
    };
    $scope.init();
  });
