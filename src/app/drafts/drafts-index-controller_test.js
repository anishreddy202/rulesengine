/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Unit: draft-index-controller', function () {
  var ctrl,
      scope,
      $httpBackend,
      $state,
      $stateParams;

  var mock_drafts_data = [{id:100,name:'draft 1'},{id:101,name:'draft 2'}];
  var duplicateDraft = {id:103,name:'copy of test draft'};

  beforeEach(module('rules'));

  beforeEach(inject(function ($injector, _$httpBackend_, _$state_, _$stateParams_) {
    scope = $injector.get('$rootScope');
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $stateParams = _$stateParams_;

    ctrl = function () {
      return $injector.get('$controller')('draftsIndexCtrl', {'$scope': scope});
    };

    $httpBackend.whenGET('api/v3/rules/drafts')
      .respond(mock_drafts_data);
    $httpBackend.whenGET('api/v3/rules/drafts/duplicate?id=100')
      .respond(duplicateDraft);
    $httpBackend.whenDELETE('api/v3/rules/drafts')
      .respond(true);
  }));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    return $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get drafts list', inject(function () {
    ctrl();
    expect(scope.drafts.length).toBe(0);
    $httpBackend.flush();
    return expect(scope.drafts.length).toBe(2);
  }));

  it('should duplicate draft on duplicateDraft', inject(function () {
    ctrl();
    scope.duplicateDraft(100);
    $httpBackend.flush();
    expect($stateParams.id).toBe(duplicateDraft.id);
  }));

  it('should delete draft on deleteDrafts', inject(function () {
    ctrl();
    scope.deleteDrafts([100]);
    $httpBackend.flush();
    expect(scope.drafts.length).toBe(1);
  }));

  it('should select all drafts on selectAll', inject(function () {
    ctrl();
    $httpBackend.flush();
    scope.selectedAll = false;
    scope.selectAll();
    expect(scope.selectedAll).toBe(true);
    expect(scope.drafts[0].selected).toBe(true);
    expect(scope.drafts[1].selected).toBe(true);
  }));
  it('should unselect all drafts on selectAll', inject(function () {
    ctrl();
    $httpBackend.flush();
    scope.selectedAll = true;
    scope.selectAll();
    expect(scope.selectedAll).toBe(false);
    expect(scope.drafts[0].selected).toBe(false);
    expect(scope.drafts[1].selected).toBe(false);
  }));
  it('should delete all selected drafts on deleteDrafts', inject(function () {
    ctrl();
    scope.selectedAll = false;
    scope.selectAll();
    expect(scope.selectedAll).toBe(true);
    scope.deleteDrafts([100,101]);
    expect(scope.selectedDrafts.length).toBe(2);
    $httpBackend.flush();
    expect(scope.drafts.length).toBe(0);
  }));
});
