angular.module('rules.components.lookups', ['ngResource'])
  .factory('Lookup', function ($resource, Helper, PageVariables, CONFIG) {
    'use strict';
    if (Helper.IsGHPage() || CONFIG.enableMock) {
      return $resource('mocks/lookups/', {}, {
        getStateTypes:{
          url: 'mocks/lookups/state-types.json',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getEnvironmentTypes:{
          url: 'mocks/lookups/environment-types.json',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getMatchesTemplate:{
          url: 'mocks/lookups/dictionary/matches.json',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getFeaturesTemplate:{
          url: 'mocks/lookups/dictionary/features.json',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getCategories:{
          url: 'mocks/lookups/categories.json',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getCategoryTypes:{
          url: 'mocks/lookups/category-types.json',
          isArray: true,
          method: 'GET',
          cache: true
        }
      });
    } else {
      return $resource('/api/v3/rules/lookup', {}, {
        getStateTypes:{
          url: '/api/v3/rules/lookup/state-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getEnvironmentTypes:{
          url: '/api/v3/rules/lookup/environment-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getCategories:{
          url: '/api/v3/rules/lookup/categories',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getCategoryTypes:{
          url: '/api/v3/rules/lookup/category-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getDraftTypes:{
          url: '/api/v3/rules/lookup/draft-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getPolicyTypes:{
          url: '/api/v3/rules/lookup/policy-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getMediaTypes:{
          url: '/api/v3/rules/lookup/media-types',
          isArray: true,
          method: 'GET',
          cache: true
        },
        getMatchesTemplate:{
          url: '/api/v3/rules/lookup/dictionary/matches',
          params: {media_type_id: PageVariables.MEDIA_TYPE_ID},
          isArray: true,
          method: 'GET',
          cache: true
        },
        getFeaturesTemplate:{
          url: '/api/v3/rules/lookup/dictionary/features',
          params: {media_type_id: PageVariables.MEDIA_TYPE_ID},
          isArray: true,
          method: 'GET',
          cache: true
        }
      });
    }
  });

  /*
  @TODO: Make lookups easier, provide filters to get friendly names
  .filter('stateIdToFriendly', function (Lookup, $window) {
    'use strict';
    return function(stateId) {
      Lookup.getStateTypes(function (states) {
        var state = _.find(states, { id: stateId });
        $window.console.log('FRIENDLY NAME', state.name);
        return state.name;
      });
    };
  });
  */



