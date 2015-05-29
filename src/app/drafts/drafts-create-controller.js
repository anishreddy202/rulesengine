/* global console */

angular.module('rules.drafts')
  .controller('draftsCreateCtrl', function ($scope, $filter, RuleValidator, match_templates, feature_templates, $rootScope, $state, $stateParams,PageVariables, Translator, Policy, Draft, Helper, Messenger, CATEGORIES, CATEGORY_TYPES, CODES, CONST) {
    'use strict';
    $scope.createMode = true;
    $scope.$root.draftView = true;
    $scope.isRaw = false;
    $scope.draft = {};
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


    var goBacktoShowPage = function (id) {
      if ($state.current.name.indexOf('.raw') > -1) {
        $state.go('main.drafts.show.raw', {id: id});
      } else {
        $state.go('main.drafts.show.rulebuilder', {id: id});
      }
    };

    function submitPolicy(xml) {
      $scope.draft.media_type_id = PageVariables.MEDIA_TYPE_ID;
      $scope.draft.body = Helper.xmlToString(xml);
      //$scope.draft.draft_type_id = PageVariables.DRAFT_TYPE_ID;

      if ($scope.draft.id) {
        $scope.draft = Draft.update($scope.draft, function (draft) {
          Messenger.send(CODES.draft_save.success);
          goBacktoShowPage(draft.id);
        }, function (err) {
          console.log(err);
          Messenger.send(CODES.draft_save.error);
          $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.error);
        });
      } else {
        $scope.draft = Draft.create($scope.draft, function (draft) {
          Messenger.send(CODES.draft_save.success);
          goBacktoShowPage(draft.id);
        }, function (err) {
          console.log(err);
          $scope.globalErrorCallback(err);
        });
      }
    }
    //todo: hacky way to broadcast from child scope
    $scope.broadcast = function(type, message){
      $scope.$broadcast(type,message);
    };

    $scope.cancel = function () {
      $state.go('main.drafts.index');
    };
    $scope.saveDraft = function () {
      $scope.$broadcast(CONST.EVENTS.KICKOFF_VALIDATIONS, CODES.draft_save.warning);
      if ($scope.draftForm.$invalid){
        return;
      }
      if (RuleValidator.isAllRulesValid($scope.rules)){
        var xml = $rootScope.xml;
        if ($state.current.name.indexOf('.rulebuilder') > -1) {
          $rootScope.xml = xml = Translator.toXML($rootScope.rules);
        }
        submitPolicy(xml);
      } else {
        $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.form_error);
      }
    };

    var getDraft = function (id) {
      $scope.draft = Draft.get({id: id}, function (res) {
        var xml = res.body;
        $rootScope.xml = Helper.formatXml(xml);
        $rootScope.rules = Translator.toJSON(xml);
      }, function (err) {
        console.log(err);
        $scope.globalErrorCallback(err);
      });
    };

    $scope.init = function () {
      if ($stateParams.id) {
        getDraft($stateParams.id);
      } else {
        $scope.editMode = true;//create flow
        $rootScope.rules =[];
        $rootScope.xml ='';
      }
    };
    $scope.init();
  });
