/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Unit: draft-view-controller', function () {
  var ctrl,
      scope,
      $httpBackend,
      $state,
      $stateParams;

  var mock_draft = {
                    'name': 'rule - if-else-then',
                    'media_type_id': 1,
                    'body': '<rules><rule><if><tag>match.client-address</tag><result>matches</result><value>23.23.23.23</value></if><then><tag>feature.cache-control-treatment</tag><result>overwrite</result></then><else><tag>feature.cache-control-treatment</tag><result>pass through</result></else></rule></rules>',
                    'draft_type_id': 1,
                    'tag': 'test tag',
                    'created_at': '2014-10-25T14:47:09.468Z',
                    'status': 2,
                    'id': 103
                   };
  var mock_policy = {
                    'body': '<rules><rule><if><tag>match.client-address</tag><result>matches</result><value>23.23.23.23</value></if><then><tag>feature.deny-access</tag><result>disabled</result></then><else><tag>feature.deny-access</tag><result>enabled</result></else></rule></rules>',
                    'name': 'prod rules',
                    'dopolicyype_id': 1,
                    'status': 4,
                    'id': 222,
                    'environment': 1,
                    'published_at': '2014-10-21T15:02:01.308Z'
                   };
  //var mock_rule = [{'id':'53c5','expressions':[{'id':'5cd0','isDelete':true,'If':{'id':'0e4c','name':'IF','conditions':[{'id':'dd98','value':'match.client-address','text':'Client IP Address','args':[{'tag':'result','display':null,'type':{'shape':'dropDown','display':null,'attributes':[],'choice':[{'value':'matches','display':'Matches'},{'value':'nomatch','display':'Does Not Match'}]},'multiple':false,'use':'required','default':'matches','value':'matches'},{'tag':'value','display':null,'type':{'shape':'textBox','display':null,'attributes':[],'regex':'[+-]?[-_a-zA-Z0-9 ]+'},'multiple':false,'use':'required','default':null,'value':'23.23.23.23'}],'supported_features':[]}]},'Then':{'id':'876a','name':'THEN','actions':[{'id':'1153','value':'feature.cache-control-treatment','text':'Cache-Control Header Treatment','args':[{'tag':'result','display':null,'type':{'shape':'dropDown','display':null,'attributes':[],'choice':[{'value':'overwrite','display':'overwrite'},{'value':'pass through','display':'pass through'},{'value':'add if missing','display':'add if missing'},{'value':'remove','display':'remove'}]},'multiple':false,'use':'required','default':'overwrite','value':'overwrite'}],'supported_features':[]}],'expressions':[]},'Else':{'id':'8ce8','name':'ELSE','actions':[{'id':'cf20','value':'feature.cache-control-treatment','text':'Cache-Control Header Treatment','args':[{'tag':'result','display':null,'type':{'shape':'dropDown','display':null,'attributes':[],'choice':[{'value':'overwrite','display':'overwrite'},{'value':'pass through','display':'pass through'},{'value':'add if missing','display':'add if missing'},{'value':'remove','display':'remove'}]},'multiple':false,'use':'required','default':'overwrite','value':'pass through'}],'supported_features':[]}],'expressions':[]}}],'name':' Rule # 1'}];
  beforeEach(module('rules'));

  beforeEach(inject(function ($injector, _$httpBackend_, _$state_, _$stateParams_) {
    scope = $injector.get('$rootScope');
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $stateParams = _$stateParams_;

    ctrl = function () {
      return $injector.get('$controller')('draftsViewCtrl', {'$scope': scope});
    };

    $httpBackend.whenGET('api/v3/rules/drafts?id=103')
      .respond(mock_draft);
    $httpBackend.whenPOST('api/v3/rules/drafts')
      .respond(mock_draft);
    $httpBackend.whenPUT('api/v3/rules/drafts')
      .respond(mock_draft);
    $httpBackend.whenDELETE('api/v3/rules/drafts/103')
      .respond(undefined);
    $httpBackend.whenPOST('api/v3/rules/drafts/publish')
      .respond(mock_policy);}));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    return $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get draft', inject(function () {
    $stateParams.id = 103;
    ctrl($stateParams);
    expect(scope.draft.id).toBeUndefined();
    $httpBackend.flush();
    expect(scope.draft).toBeDefined();
    return expect(scope.draft.id).toBe(103);
  }));
   it('should delete draft on deleteDraft', inject(function () {
    $stateParams.id = 103;
    ctrl();
    scope.deleteDraft(103);
    $httpBackend.flush();
    expect(scope.draft.id).toBeUndefined();
  }));

  it('should parse xml', inject(function () {
    $stateParams.id = 103;
    ctrl($stateParams);
    expect(scope.draft.id).toBeUndefined();
    $httpBackend.flush();
    expect(scope.draft).toBeDefined();
    expect(scope.xml.length).toBeGreaterThan(1);
    return expect(scope.rules.length).toBe(1);
  }));
  it('should set the raw xml on raw state', inject(function () {
    $stateParams.id = 103;
    ctrl(scope,$stateParams);
    scope.isRaw = true;
    expect(scope.draft.id).toBeUndefined();
    $httpBackend.flush();
    expect(scope.draft).toBeDefined();
    return expect(scope.xml.length).toBeGreaterThan(1);
  }));
  it('should publish draft on publishDraft', inject(function () {
    $stateParams.id = 103;
    ctrl();
    expect(scope.policy.toBeUndefined());
    scope.publishDraft();
    $httpBackend.flush();
    expect(scope.policy.toBeDefined());
    return expect(scope.policy.id).toBe(222);
  }));
});
