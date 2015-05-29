/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Unit: home-controller', function () {
  var homeCtrl,
      scope,
      $httpBackend,
      $state,
      $stateParams;

  var mock_policies_data = [{id:100,name:'draft 1'},{id:101,name:'draft 2'}];
  var duplicatePolicy = {id:103,name:'copy of test draft'};
  beforeEach(module('rules'));

  beforeEach(inject(function ($injector, _$httpBackend_, _$state_, _$stateParams_) {
    scope = $injector.get('$rootScope');
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $stateParams = _$stateParams_;

    homeCtrl = function () {
      return $injector.get('$controller')('homeCtrl', {'$scope': scope});
    };

    $httpBackend.whenGET('api/v3/rules/policies')
      .respond(mock_policies_data);
    $httpBackend.whenGET('api/v3/rules/policies/duplicate?id=100')
      .respond(duplicatePolicy);
  }));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    return $httpBackend.verifyNoOutstandingRequest();
  });
  it('should get policies list', inject(function () {
    homeCtrl();
    expect(scope.policies.length).toBe(0);
    $httpBackend.flush();
    return expect(scope.policies.length).toBe(2);
  }));

  it('duplicate policy on duplicatePolicy', inject(function () {
    homeCtrl();
    scope.duplicatePolicy(100);
    $httpBackend.flush();
    expect($stateParams.id).toBe(duplicatePolicy.id);
  }));
});
