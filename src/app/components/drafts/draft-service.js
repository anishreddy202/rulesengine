angular.module('rules.components.drafts', ['ngResource'])
  .factory('Draft', function ($resource, Helper, CONFIG, PageVariables) {
    'use strict';
    if (Helper.IsGHPage() || CONFIG.enableMock) {
      return $resource('mocks/drafts.json', {}, {
        query: {isArray: true, method: 'GET'},
        get: {
          url: 'mocks/draft.json',
          method: 'GET',
          isArray: false
        }
      });
    } else {
      return $resource('/api/v3/rules/drafts/:id', {}, {
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
            source_id: '@source_id',
            media_type_id: PageVariables.MEDIA_TYPE_ID
          }
        },
        delete: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      });
    }
  });
