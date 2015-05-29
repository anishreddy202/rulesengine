(function() {
  var MockEntity, PolicyDrafts, policyDraftPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  policyDraftPrefix = '.*/api/v3/rules/drafts';

  prt = function(s) {
    return console.log(s);
  };

  PolicyDrafts = (function(_super) {
    __extends(PolicyDrafts, _super);

    function PolicyDrafts() {
      return PolicyDrafts.__super__.constructor.apply(this, arguments);
    }

    PolicyDrafts.prototype.idProp = 'id';

    PolicyDrafts.prototype.fname = 'drafts';

    PolicyDrafts.prototype.dispatch = [
      {
        op: 'create',
        method: 'POST',
        urlpath: policyDraftPrefix
      }, {
        op: 'read',
        method: 'GET',
        urlpath: "" + policyDraftPrefix + "/([0-9]+)"
      }, {
        op: 'update',
        method: 'PUT',
        urlpath: policyDraftPrefix+ "/([0-9]+)"
      }, {
        op: 'delete',
        method: 'DELETE',
        urlpath: "" + policyDraftPrefix + "/([0-9]+)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: policyDraftPrefix
      }, {
        op: 'duplicate',
        method: 'POST',
        urlpath: policyDraftPrefix + "?media_type_id=([0-9]+)&source_id=([0-9]+)"
      }
    ];

    PolicyDrafts.prototype.create_hook = function(policy) {
      policy.created_at = new Date().toJSON();
      policy.updated_at = new Date().toJSON();
      return policy.status = 1;
    };
    PolicyDrafts.prototype.update_hook = function(policy) {
      policy.updated_at = new Date().toJSON();
      return policy.status = 1;
    };

    PolicyDrafts.prototype.list_hook = function(policy) {
      var retainTheseProperties;
      retainTheseProperties = ['id', 'name', 'media_type_id', 'created_at', 'updated_at', 'draft_type_id'];
      policy.id = policy.id;
      return this.deleteSomeProperties(policy, retainTheseProperties);
    };

    PolicyDrafts.prototype.duplicate = function(arghash, request, cb) {
      var draft, drafts, _i, _len;
      drafts = this.listFromOther('drafts');
      for (_i = 0, _len = drafts.length; _i < _len; _i++) {
        draft = drafts[_i];
        if (draft.id == arghash.source_id) {
          var newDraft = {};
          newDraft.id = this.generateId(this.fname);
          newDraft.name = "Copy of " + draft.name;
          newDraft.body = draft.body;
          newDraft.media_type_id = draft.media_type_id;
          newDraft.created_at = new Date().toJSON();
          newDraft.draft_type_id = draft.draft_type_id;
          if(draft.document_type_id){ // if its document
            newDraft.draft_type_id = draft.document_type_id;
            newDraft.environment = undefined;
            newDraft.status = 1;
            newDraft.document_type_id = undefined;
          }
          drafts.push(newDraft);
          this.writeObjToJsonFile(this.fname, drafts);
          return this.fastReturn(cb, newDraft);
        }
      }
    };

    PolicyDrafts.prototype.shape = {
      id: {
        type: 'number',
        absentWhen: 'creating'
      },
      media_type_id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      body: {
        type: 'string'
      }
    };

    return PolicyDrafts;

  })(MockEntity);

  new PolicyDrafts();

}).call(this);
