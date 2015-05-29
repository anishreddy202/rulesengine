angular.module('rules.components.deploy_requests', ['ngResource'])
  .factory('DeployRequest', function ($resource, Helper, CONFIG, PageVariables) {
    'use strict';
    if (Helper.IsGHPage() || CONFIG.enableMock) {
      return $resource('mocks/deploy_requests.json', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        get: {
          method: 'GET',
          url: 'mocks/deploy_request.json'
        }
      });
    }
    return $resource('/api/v3/rules/deploy-requests/:id', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        }
      },
      query: {
        method: 'GET',
        params: {
          media_type_id: PageVariables.MEDIA_TYPE_ID
        },
        isArray: true
      },
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        }
      }
    });
  });
