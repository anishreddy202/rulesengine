angular.module('rules.components.dictionary', ['ngResource'])
  .factory('Dictionary', function ($resource, Helper, CONFIG, PageVariables) {
    'use strict';
    if (Helper.IsGHPage() || CONFIG.enableMock) {
      return  $resource('mocks/groups.json', {}, {
        query: { isArray: true, method: 'GET'},
        getMatches: { url: 'mocks/matches.json', method: 'GET', isArray: true },
        getFeatures: { url: 'mocks/features.json', method: 'GET', isArray: true },
        getMatch: { url: 'mocks/match.json', method: 'GET', isArray: false },
        getFeature: { url: 'mocks/feature.json', method: 'GET', isArray: false }
      });
    } else {
      return $resource('/api/v3/rules/matches/:id', {}, {
        getMatches: {
          isArray: true,
          method: 'GET',
          params: {media_type_id: PageVariables.MEDIA_TYPE_ID},
          cache:true
        },
        getMatch:{
          isArray: false,
          params: { id: '@id', media_type_id: PageVariables.MEDIA_TYPE_ID},
          method: 'GET',
          cache:true
        },
        getFeatures: {
          url: '/api/v3/rules/matches/:id/features',
          method: 'GET',
          params: { id: '@id', media_type_id: PageVariables.MEDIA_TYPE_ID},
          isArray: true,
          cache:true
        },
        getFeature: {
          url: '/api/v3/rules/matches/:match_id/features/:id',
          method: 'GET',
          params: { match_id:'@match_id', id:'@id',media_type_id: PageVariables.MEDIA_TYPE_ID},
          isArray: false,
          cache:true
        }
      });
    }
  });
