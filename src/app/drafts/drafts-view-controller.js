/* global console */

angular.module('rules.drafts')
  .controller('draftsViewCtrl', function ($scope, $filter, match_templates, feature_templates, Dictionary, $state, PageVariables, $stateParams, Translator, Draft, Policy, Helper, Messenger, RuleValidator, CATEGORIES, CATEGORY_TYPES, CONST, CODES) {
    'use strict';
    var draftName;
    $scope.draft = {};
    $scope.$state = $state;
    $scope.$root.editMode = false;
    $scope.$root.ruleEditing = false;
    $scope.$root.draftView = true;
    $scope.editNameLoading = false;
    $scope.pageLoading = true;
    $scope.rules = [];

    if (angular.isDefined(match_templates.error) || angular.isDefined(feature_templates.error)) {
      $state.go('error');
    };
    $scope.matches = match_templates;
    $scope.features = feature_templates;
    //todo: find a way to get this into state resolve
    Translator.setTemplates(match_templates, feature_templates);


    var match_category_type = $filter('filter')(CATEGORY_TYPES, function (c) {
      return c.name.indexOf('Match') >= 0;
    })[0];
    var feature_category_type = $filter('filter')(CATEGORY_TYPES, function (c) {
      return c.name.indexOf('Feature') >= 0;
    })[0];
    $scope.match_categories = $filter('filter')(CATEGORIES, function (c) {
      return c.category_type_id === match_category_type.id;
    });
    $scope.feature_categories = $filter('filter')(CATEGORIES, function (c) {
      return c.category_type_id === feature_category_type.id;
    });


    var getDraft = function (id) {
      $scope.draft = Draft.get({id: id}, function (res) {
        var xml = res.body;
        $scope.xml = Helper.formatXml(xml);
        $scope.rules = Translator.toJSON(xml);
        $scope.pageLoading = false;
       //$scope.$broadcast(CONST.EVENTS.DRAFT_LOADED);

      },function (err) {
        console.log(err);
        $scope.pageLoading = false;
        $scope.globalErrorCallback(err);

      });
    };

    function submitPolicy(xml, copy, rule) {
      $scope.draft.media_type_id = PageVariables.MEDIA_TYPE_ID;
      $scope.draft.body = Helper.xmlToString(xml);

      var draft = angular.copy($scope.draft);
      if (copy) {
        draft.id = undefined;
        draft.name = 'copy of ' + draft.name;
      }

      if (draft.id) {
        Draft.update(draft, function () {
          $scope.$root.editMode = false;
          draftName = undefined;
          $scope.editNameLoading = false;
          $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.success);
        }, function (err) {
          console.log(err);
          $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.error);
        });
      } else {
        Draft.create(draft, function (draft) {
          $scope.draft.id = draft.id;
          if (copy) {
            $state.go('main.drafts.show.rulebuilder', {id: draft.id});
          } else {
            $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.success);
            $scope.init();
          }
        }, function (err) {
          console.log(err);
          $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.error);
        });
      }
    }

    $scope.editName = function () {
      draftName = $scope.draft.name;
      $scope.$root.editMode = true;
    };
    $scope.updateDraftName = function (newName) {
      $scope.editNameLoading = true;
      draftName = $scope.draft.name;
      $scope.draft.name = newName;
      if (draftName !== newName) {
        $scope.saveDraft();
      }
    };
    $scope.cancelNameEditing = function () {
      $scope.draft.name = angular.copy(draftName);
      $scope.$root.editMode = false;
      draftName = undefined;
    };

    $scope.saveDraft = function (copy, rule) {
      $scope.$broadcast(CONST.EVENTS.KICKOFF_VALIDATIONS, CODES.draft_save.warning);
      if ($scope.draftForm.$invalid) {
        return;
      }
      var xml = $scope.xml;
      if ($state.current.name.indexOf('.rulebuilder') > -1) {
        $scope.xml = xml = Translator.toXML($scope.rules);
      }
      submitPolicy(xml, copy, rule);
    };
    //todo: hacky way to broadcast from child scope
    $scope.broadcast = function (type, message) {
      $scope.$broadcast(type, message);
    };

    $scope.onConfirmDelete = function () {
      $scope.pageLoading = true;
      $scope.draft = Draft.delete({id: $scope.draft.id}, function () {
        $scope.pageLoading = false;
        Messenger.send(CODES.draft_delete.success);
        $state.go('main.drafts.index');
      }, function (err) {
        $scope.pageLoading = false;
        console.log(err);
        Messenger.send(CODES.draft_delete.error);
      });
    };
    $scope.duplicateDraft = function () {
      $scope.pageLoading = true;
      var id = $scope.draft.id;
      Draft.copy({source_id: id}, function (draft) {
        $scope.pageLoading = false;
        Messenger.send(CODES.draft_copy.success);
        $state.go('main.drafts.show.rulebuilder', {id: draft.id});
      }, function (err) {
        $scope.pageLoading = false;
        console.log(err);
        Messenger.send(CODES.draft_copy.error);
      });
    };

    $scope.publishDraft = function () {
      //todo: rule validation disabled temporarily
      var isrulesvalid = RuleValidator.isAllRulesValid($scope.rules);
      if (isrulesvalid) {
        $scope.pageLoading = true;
        $scope.policy = {};
        $scope.policy.media_type_id = $scope.draft.media_type_id;
        $scope.policy.body = Helper.xmlToString($scope.xml);
        $scope.policy.name = $scope.draft.name;
        $scope.policy.draft_id = $scope.draft.id;
        if ($scope.draft.environment) {
          $scope.policy.environment = $scope.draft.environment;
        }
        $scope.policy = Policy.create($scope.policy, function (doc) {
          $scope.pageLoading = false;
          Messenger.send(CODES.policy_save.success);
          if ($state.current.name === 'main.drafts.show.raw') {
            $state.go('main.policies.show.raw', {id: doc.id});
          } else {
            $state.go('main.policies.show.rulebuilder', {id: doc.id});
          }
        }, function (err) {
          console.log(err);
          $scope.pageLoading = false;
          $scope.globalErrorCallback(err);
        });
      } else {
        $scope.pageLoading = false;
        $scope.broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.policy_save.form_error);
      }
    };
    $scope.init = function () {
      $scope.$root.editMode = false;
      if ($stateParams.id) {
        getDraft($stateParams.id);
      }
    };
    $scope.init();
  });
