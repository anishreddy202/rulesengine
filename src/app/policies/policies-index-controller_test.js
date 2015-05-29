/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Unit: policy-index-controller', function () {
  var ctrl,
      scope,
      $httpBackend,
      $state,
      $stateParams;

  var mock_policies_data = [{id:100,name:'policy 1'},{id:101,name:'policy 2'}];
  var duplicatePolicy = {id:103,name:'copy of test policy'};

  beforeEach(module('rules'));

  beforeEach(inject(function ($injector, _$httpBackend_, _$state_, _$stateParams_) {
    scope = $injector.get('$rootScope');
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $stateParams = _$stateParams_;

    ctrl = function () {
      return $injector.get('$controller')('policiesIndexCtrl', {'$scope': scope});
    };

    $httpBackend.whenGET('api/v3/rules/policies')
      .respond(mock_policies_data);
    $httpBackend.whenGET('api/v3/rules/policies/duplicate?id=100')
      .respond(duplicatePolicy);
    $httpBackend.whenDELETE('api/v3/rules/policies')
      .respond(true);
  }));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    return $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get policies list', inject(function () {
    ctrl();
    expect(scope.policies.length).toBe(0);
    $httpBackend.flush();
    return expect(scope.policies.length).toBe(2);
  }));

  it('should duplicate policy on duplicatePolicy', inject(function () {
    ctrl();
    scope.duplicatePolicy(100);
    $httpBackend.flush();
    expect($stateParams.id).toBe(duplicatePolicy.id);
  }));

  it('should delete policy on deletePolicys', inject(function () {
    ctrl();
    scope.deletePolicys([100]);
    $httpBackend.flush();
    expect(scope.policies.length).toBe(1);
  }));

  it('should select all policies on selectAll', inject(function () {
    ctrl();
    $httpBackend.flush();
    scope.selectedAll = false;
    scope.selectAll();
    expect(scope.selectedAll).toBe(true);
    expect(scope.policies[0].selected).toBe(true);
    expect(scope.policies[1].selected).toBe(true);
  }));
  it('should unselect all policies on selectAll', inject(function () {
    ctrl();
    $httpBackend.flush();
    scope.selectedAll = true;
    scope.selectAll();
    expect(scope.selectedAll).toBe(false);
    expect(scope.policies[0].selected).toBe(false);
    expect(scope.policies[1].selected).toBe(false);
  }));
  it('should delete all selected policies on deletePolicies', inject(function () {
    ctrl();
    scope.selectedAll = false;
    scope.selectAll();
    expect(scope.selectedAll).toBe(true);
    scope.deletePolicies([100,101]);
    expect(scope.selectedPolicies.length).toBe(2);
    $httpBackend.flush();
    expect(scope.policies.length).toBe(0);
  }));
});
