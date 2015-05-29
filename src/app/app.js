/* global console */

angular.module('rules', [
  'ui.router',
  'ui.utils',
  'ui.sortable',
  'rules.home',
  'rules.drafts',
  'rules.policies',
  'rules.deploy_requests'
])
  .provider('PageVariables', function () {
    'use strict';
    var values = {};
    return {
      set: function (variables) {
        angular.extend(values, variables);
      },
      $get: function () {
        return values;
      }
    };
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('main', {
        abstract: true,
        controller: function ($scope, $state, STATES, ENVIRONMENT_TYPES, CONST, CODES) {
          $scope.globalErrorCallback = function (err) {
            var apiErr = CODES.services.error;
            if (angular.isDefined(err) && angular.isDefined(err.data))
            {
              if (!angular.isDefined(err.data.message) || err.data.message=="undefined"){
                apiErr.text = "Server error : ";
              }
              else {
                apiErr.text = "Server error : " + err.data.message;
              }
              apiErr.detail = err.data.detail;
            }
             $scope.$broadcast(CONST.EVENTS.INSTANT_MESSAGING, apiErr);
          };
          if (STATES.error) {
            console.log(STATES.error);
            $state.go('error');
          } else {
            $scope.STATES = STATES;
            // extend states with class helpers
            angular.forEach($scope.STATES, function (state) {
              switch (state.name.toLowerCase()) {
                case 'submitted':
                  state.iconClass = 'fa-send text-muted';
                  state.labelClass = 'label-default';
                  break;
                case 'approved':
                  state.iconClass = 'fa-check-circle text-info';
                  state.labelClass = 'label-info';
                  break;
                case 'rejected':
                  state.iconClass = 'fa-times-circle text-danger';
                  state.labelClass = 'label-danger';
                  break;
                case 'deployed':
                  state.iconClass = 'fa-cloud-upload text-success';
                  state.labelClass = 'label-success';
                  break;
                case 'pending review':
                  state.iconClass = 'fa-flag text-warning';
                  state.labelClass = 'label-warning';
                  break;
                case 'escalated':
                  state.iconClass = 'fa-warning text-warning';
                  state.labelClass = 'label-warning';
                  break;
                case 'canceled':
                  state.iconClass = 'fa-times-circle text-muted';
                  state.labelClass = 'label-default';
                  break;
                case 'verification delayed':
                  state.iconClass = 'fa-eye-slash text-warning';
                  state.labelClass = 'label-warning';
                  break;
                case 'deployment delayed':
                  state.iconClass = 'fa-tachometer text-warning';
                  state.labelClass = 'label-warning';
                  break;
                default:
                  state.iconClass = 'fa-question text-muted';
                  state.labelClass = 'label-default';
                  break;
              }
            });
          }
          ;

          //convert lookups to enums
          /*$scope.states = {};
           angular.forEach(STATES, function (s) {
           $scope.states[s.name.replace(' ', '_')] = s.id;
           });*/

          if (ENVIRONMENT_TYPES.error) {
            console.log(ENVIRONMENT_TYPES.error);
            $state.go('error');
          } else {
            $scope.env = {};
            angular.forEach(ENVIRONMENT_TYPES, function (s) {
              $scope.env[s.name] = s.id;
            });
          }
        },
        resolve: { //GLOBAL RESOLVE
          Lookup: 'Lookup',
          STATES: function (Lookup) {
            return Lookup.getStateTypes().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          },
          ENVIRONMENT_TYPES: function (Lookup) {
            return Lookup.getEnvironmentTypes().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          },
          CATEGORIES: function (Lookup) {
            return Lookup.getCategories().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
            ;
          },
          CATEGORY_TYPES: function (Lookup) {
            return Lookup.getCategoryTypes().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          }
        }
      })
      .state('main.home', {
        url: '/',
        controller: 'homeCtrl',
        templateUrl: '/rules/home/home.html'
      })
      .state('error', {
        url: '/',
        templateUrl: '/rules/error/error.html'
      })

      // DRAFTS
      .state('main.drafts', {
        url: '/drafts',
        templateUrl: '/rules/drafts/drafts.html',
        abstract: true
      })
      .state('main.drafts.index', {
        url: '',
        controller: 'draftsIndexCtrl',
        templateUrl: '/rules/drafts/drafts-index.html'
      })
      .state('main.drafts.create', {
        url: '/create',
        controller: 'draftsCreateCtrl',
        templateUrl: '/rules/drafts/drafts-create.html',
        abstract: true,
        resolve: {
          Lookup: 'Lookup',
          match_templates: function (Lookup) {
            return Lookup.getMatchesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          },
          feature_templates: function (Lookup) {
            return Lookup.getFeaturesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          }
        }
      })
      .state('main.drafts.create.rulebuilder', {
        url: '',
        templateUrl: '/rules/drafts/drafts-create-rulebuilder.html'
      })
      .state('main.drafts.create.raw', {
        url: '/raw',
        controller: 'draftsCreateRawCtrl',
        templateUrl: '/rules/drafts/drafts-create-raw.html'
      })
      .state('main.drafts.show', {
        url: '/:id',
        controller: 'draftsViewCtrl',
        templateUrl: '/rules/drafts/drafts-show.html',
        abstract: true,
        resolve: {
          Lookup: 'Lookup',
          match_templates: function (Lookup) {
            return Lookup.getMatchesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          },
          feature_templates: function (Lookup) {
            return Lookup.getFeaturesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          }
        }
      })
      .state('main.drafts.show.rulebuilder', {
        url: '',
        templateUrl: '/rules/drafts/drafts-show-rulebuilder.html'
      })
      .state('main.drafts.show.raw', {
        url: '/raw',
        templateUrl: '/rules/drafts/drafts-show-raw.html'
      })

      // POLICIES
      .state('main.policies', {
        url: '/policies',
        templateUrl: '/rules/policies/policies.html',
        abstract: true
      })
      .state('main.policies.index', {
        url: '',
        controller: 'policiesIndexCtrl',
        templateUrl: '/rules/policies/policies-index.html'
      })
      .state('main.policies.show', {
        url: '/:id',
        controller: 'policiesViewCtrl',
        templateUrl: '/rules/policies/policies-show.html',
        abstract: true,
        resolve: {
          Lookup: 'Lookup',
          match_templates: function (Lookup) {
            return Lookup.getMatchesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          },
          feature_templates: function (Lookup) {
            return Lookup.getFeaturesTemplate().$promise.then(function (res) {
              return res;
            }, function (err) {
              return {error: err};
            });
          }
        }
      })
      .state('main.policies.show.rulebuilder', {
        url: '',
        templateUrl: '/rules/policies/policies-show-rulebuilder.html'
      })
      .state('main.policies.show.raw', {
        url: '/raw',
        templateUrl: '/rules/policies/policies-show-raw.html'
      })

      // DEPLOY REQUESTS
      .state('main.deploy_requests', {
        url: '/deploy-requests',
        templateUrl: '/rules/deploy-requests/deploy-requests.html',
        abstract: true
      })
      .state('main.deploy_requests.index', {
        url: '',
        controller: 'deployRequestsIndexCtrl',
        templateUrl: '/rules/deploy-requests/deploy-requests-index.html'
      })
      .state('main.deploy_requests.create', {
        url: '/create/:id',
        controller: 'deployRequestsCreateCtrl',
        templateUrl: '/rules/deploy-requests/deploy-requests-create.html',
        abstract: true
      })
      .state('main.deploy_requests.create.raw', {
        url: '/raw',
        templateUrl: '/rules/deploy-requests/deploy-requests-show-raw.html'
      })
      .state('main.deploy_requests.create.rulebuilder', {
        url: '',
        templateUrl: '/rules/deploy-requests/deploy-requests-show-rulebuilder.html'
      })
      .state('main.deploy_requests.show', {
        url: '/:id',
        controller: 'deployRequestViewCtrl',
        templateUrl: '/rules/deploy-requests/deploy-requests-show.html'
      });
  })
  .config(function (PageVariablesProvider) {
    'use strict';
    PageVariablesProvider.set({
      MEDIA_TYPE_ID: window.GLOBAL_CONFIG.MEDIA_TYPE_ID
    });
  });
