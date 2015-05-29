angular.module('rules.components.policies', ['ngResource'])
  .factory('Policy', function ($resource, Helper, CONFIG, PageVariables) {
    'use strict';
    if (Helper.IsGHPage() || CONFIG.enableMock) {
      return $resource('mocks/policies.json', {}, {
        query: {
          isArray: true,
          method: 'GET'
        },
        get: {
          url: 'mocks/policy.json',
          method: 'GET',
          isArray: false
        }
      });
    } else {
      return $resource('/api/v3/rules/policies/:id', {}, {
        query: {
          url : '/api/v3/rules/policies',
          method: 'GET',
          params: {
            media_type_id: PageVariables.MEDIA_TYPE_ID
          },
          isArray: true
        },
        get: {
          method: 'GET',
          params: {
            id: '@id'
          },
          isArray: false
        },
        update: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        },
        create: {
          method: 'POST'
        },
        copy: {
          method: 'POST',
          params: {
            media_type_id: PageVariables.MEDIA_TYPE_ID,
            source_id: '@source_id'
          }
        },
        delete: {
          params: {
            id: '@id'
          },
          method: 'DELETE'
        },
        archive: {
          url : '/api/v3/rules/policies/:id/archive',
          method : 'POST',
          params: {
            id: '@id'
          }
        }
      });
    }
  });
