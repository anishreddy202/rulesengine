/* global console */
var $ = $ || undefined;

angular.module('rules.rulebuilder')
  .controller('rulebuilderCtrl', function ($scope, $filter, Dictionary, RuleValidator, $state, $stateParams, Translator, Helper, CONST, CODES, ENUMS, Draft) {
    'use strict';
    $scope.actions = [];
    $scope.NODETYPE = ENUMS.NODETYPE;
    $scope.current_rule = undefined;
    $scope.isBoolean = Helper.isBoolean;
    $scope.getItemByKey = Helper.getItemByKey;

    //$scope.rules = $scope.$parent.rules;
    $scope.$on(CONST.EVENTS.DRAFT_LOADED, function(){
      $scope.rules = $scope.$parent.rules;
      console.log($scope.rules);
    });

    $scope.controlType = function (attr) {
      var type = attr.type ? attr.type.toLowerCase() : attr.type;
      switch (type) {
        case 'string':
          return attr.options && attr.options.length > 0 ? 'select' : 'input';
        case 'array':
          return attr.options && attr.options.length > 0 ? 'multicheck' : 'textarea';
        case 'bool':
          return 'check';
        case 'arrstr':
          return 'combo';
        default:
          return attr.options && attr.options.length > 0 ? 'multilabel' : 'label';
      }
    };
    $scope.resetValid = function (attr, parentItem) {
      if (!attr.isValid) {
        attr.isValid = Helper.validateRgx(attr.regex, attr.value, attr.required);
        parentItem.isValid = attr.isValid;
      }
      return true;
    };

    $scope.filterByCategory = function (category_id) {
      return function (item) {
        if (angular.isDefined(item.enabled)) {
          return item.category_id === category_id && item.enabled === true;
        }
        return item.category_id === category_id;
      };
    };

    function updateMatchTemplates() {
      //Added to update enabled property for matches
      Dictionary.getMatches(function(matchList){
        $.extend($scope.$parent.matches, matchList);
      });
    }

    function updateAttributeValues(match_attributes, condition_attributes) {
      angular.forEach(match_attributes, function (match_attr) {
        angular.forEach(condition_attributes, function (condition_attr) {
          if (match_attr.key === condition_attr.key) {
            match_attr.value = condition_attr.value;

            if ($scope.controlType(match_attr) === 'multicheck') {
              //sets selected options incase of multicheckbox
              angular.forEach(match_attr.options, function (option) {
                match_attr.delimiter = match_attr.delimiter ? match_attr.delimiter : ',';
                var selectedValues = condition_attr.value.split(match_attr.delimiter);
                option.selected = $filter('filter')(selectedValues, function (value) {
                  return value === option.key;
                }).length > 0;
              });
            } else if ($scope.controlType(match_attr) === 'check') {
              if (angular.isUndefined(match_attr.value) || match_attr.value === 'undefined') {
                match_attr.value = false;
              }
            }
          }
        });
      });
    }

    $scope.onSelectCategory = function (node) {
      node.selectedMatch = undefined;
      node.selectedFeature = undefined;
    };
    $scope.onSelectMatch = function (node) {
      node.fieldsLoading = true;
      node.attributes = [];
      node.tag = node.selectedMatch;
      getMatchDetails(node);
    };
    $scope.onSelectFeature = function (node, match) {
      node.fieldsLoading = true;
      node.attributes = [];
      node.tag = node.selectedFeature;
      getFeatureDetails(node, match);
    };


    var getMatchDetails = function (node) {
      Dictionary.getMatch({id: node.tag}, function (dto_match) {
        updateAttributeValues(dto_match.attributes, node.attributes);
        node.fieldsLoading = false;
        $.extend(node, dto_match); //extends to the detail match
        var tag = node.tag ? node.tag : node.name;
        Dictionary.getFeatures({id: tag}, function (dto_features) {
          var c1 = [], c2 = dto_features;
          if(angular.isDefined(node.parent)){
            if(angular.isDefined(node.parent.features)){
              c1 = node.parent.features; //get parent matchnode's features
            } else if(angular.isDefined(node.parent.parent) &&
              angular.isDefined(node.parent.parent.features)) {
              c1 = node.parent.parent.features; //select if else match node*/
            }
          }
          //node.features =  _.union(c1, c2);
          node.features =  _.uniq(_.union(c1, c2), false, function(item){ return item.tag; });
        }, $scope.globalErrorCallback);
      }, $scope.globalErrorCallback);
    };

    var getFeatureDetails = function (node, match) {
      var matchTag = angular.isDefined(match) && angular.isDefined(match.tag) ? match.tag : 'match';//todo: find if match id is needed to get feature details
      Dictionary.getFeature({match_id: matchTag, id: node.tag}, function (dto_feature) {
        updateAttributeValues(dto_feature.attributes, node.attributes);
        node.fieldsLoading = false;
        $.extend(node, dto_feature); //extends to the detail feature
      }, $scope.globalErrorCallback);
    };

    function populateNodeAttributes(nodes, parentMatch) {
      angular.forEach(nodes, function (node) {
        if (node.type === $scope.NODETYPE.MATCH) {
          parentMatch = node;
          getMatchDetails(node);
        } else if (node.type === $scope.NODETYPE.FEATURE) {
          getFeatureDetails(node, parentMatch);
        }
        if (node.nodes && node.nodes.length > 0) {
          populateNodeAttributes(node.nodes, parentMatch);
        }
      });
    };
    $scope.markDelete = function(rule){
      rule.toDelete = true;
      rule.expanded = true;
    };

    $scope.editRule = function (rule) {
      updateMatchTemplates();
      rule.expanded = true;
      rule.editMode = true;
      $scope.$root.editMode = false;
      $scope.$root.ruleEditing = true;
      $scope.current_rule = {};
      var copy = angular.copy(rule);
      $.extend($scope.current_rule, copy);
      populateNodeAttributes(rule.nodes);
    };
    var resetErrors = function(rule){
      if(!rule) return;
      angular.forEach(rule.nodes, function(node){
        node.errors = [];
        resetErrors(node);
      })
    };
    $scope.saveRule = function (rule, $parent) {
      //todo: should the rule validation done here
      //if (RuleValidator.isRuleValid(rule)) {
      if(true){
        resetErrors(rule);
        $parent.saveDraft(undefined, rule);
        $scope.current_rule = undefined;
        $scope.$root.ruleEditing = false;
        rule.isNew = false;
        rule.editMode = false;
      } else {
        $parent.broadcast(CONST.EVENTS.INSTANT_MESSAGING, CODES.draft_save.form_error);
      }
    };
    $scope.cancelEditing = function (rule) {
      rule.expanded = false;
      resetErrors(rule);
      if($scope.current_rule.isNew){
        for(var i=0;i<$scope.rules.length;i++){
          if($scope.rules[i]._id === $scope.current_rule._id){
            $scope.removeRule(i, $scope.rules);
          }
        }
      }else{
        $.extend(rule, $scope.current_rule);
      }
      rule.editMode = false;
      $scope.$root.editMode = undefined; //disables textbox at parent view
      $scope.current_rule = undefined;
      $scope.$root.ruleEditing = false;
    };
    $scope.isRuleDirty = function(){
      if(angular.isDefined($scope.current_rule)){
        var rules = $filter('filter')($scope.$parent.rules, function(rule){ return rule.id === $scope.current_rule.id;});
        if(rules && rules.length > 0){
          $scope.rulecache = rules[0];
          return !angular.equals($scope.current_rule, $scope.rulecache);
        }
      }
      return false;
    };

    $scope.addRule = function ($parent) {
      if (!$parent.rules) {
        $parent.rules = [];
      }
      updateMatchTemplates();
      var ruleIndex = parseInt($parent.rules.length);
      var newRule = Translator.GetRuleTemplate(ruleIndex + 1);
      newRule.isNew = true;
      newRule.editMode = true;
      newRule.expanded = true;
      $scope.$root.ruleEditing = true;
      $parent.rules.push(newRule);
      $scope.current_rule = newRule;
    };
    $scope.deleteRule = function (idx, $parent) {
      $parent.rules.splice(idx, 1);
      $scope.$root.ruleEditing = false;
      $scope.current_rule = undefined;
      $parent.saveDraft();
    };
    $scope.removeRule = function (idx, rules) {
      rules.splice(idx, 1);
      $scope.$root.ruleEditing = false;
    };

    $scope.addNode = function (type, node) {
      if (angular.isUndefined(node.nodes)) {
        node.nodes = [];
      }
      var newNode = {id: Helper.Guid(), type: type, parent:node};
      if (type === $scope.NODETYPE.SELECT) {
        newNode.tag = 'select.first-match';
        newNode.name = 'Select First Match';
        newNode.nodes = [];
        var defaultMatch = {id: Helper.Guid(), type: $scope.NODETYPE.MATCH, parent:node};
        newNode.nodes.push(defaultMatch);
      } else if (type === $scope.NODETYPE.MATCH) {
        //newNode.features = $scope.$parent.$parent.$parent.features; //todo: should be resolved at state
      }
      node.nodes.push(newNode);
    };
    $scope.removeNode = function (node, nodes) {
      var index = _.indexOf(_.pluck(nodes, 'id'), node.id);
      nodes.splice(index, 1);
    };

    //$scope.items = [];
    /*var getDraft = function (id) {
      $scope.draft = Draft.get({id: id}, function (res) {
        var xml = res.body;
        $scope.xml = Helper.formatXml(xml);
        $scope.items = Translator.toJSON(xml);
      }, $scope.globalErrorCallback);
    };
    getDraft(101);*/

    $scope.sortableOptions = {
      containment: '#sortable-container',
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      },
      orderChanged: function(event) {
        if($scope.$parent.rules && $scope.$parent.rules.length > 0) {
          $scope.$parent.rules[0].expanded = true;
          if ($scope.$parent.rules.length > 1) {
            for(var i=1;i<$scope.$parent.rules.length;i++){
              $scope.$parent.rules[i].expanded = false;
            }
          }
        }
        $scope.$parent.saveDraft();
      }
    };

    $scope.sortableFeaturesOptions = {
      containment: '#sortable-features',
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      }

    };

  });
