(function() {
  var MockEntity, PolicyRequests, policyRequestPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  policyRequestPrefix = '.*/api/v3/rules/policies';

  prt = function(s) {
    return console.log(s);
  };

  PolicyRequests = (function(_super) {
    __extends(PolicyRequests, _super);

    function PolicyRequests() {
      return PolicyRequests.__super__.constructor.apply(this, arguments);
    }

    PolicyRequests.prototype.idProp = 'id';

    PolicyRequests.prototype.fname = 'policies';

    PolicyRequests.prototype.dispatch = [
      {
        op: 'read',
        method: 'GET',
        urlpath: "" + policyRequestPrefix + "/([0-9]+)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: policyRequestPrefix
      }, {
        op: 'create',
        method: 'POST',
        urlpath: policyRequestPrefix
      }, {
        op: 'update',
        method: 'PUT',
        urlpath: policyRequestPrefix + "/([0-9]+)"
      }, {
        op: 'delete',
        method: 'DELETE',
        urlpath: "" + policyRequestPrefix + "/([0-9]+)"
      }, {
        op: 'duplicate',
        method: 'GET',
        urlpath: policyRequestPrefix + "?media_type_id=([0-9]+)&source_id=([0-9]+)"
      },{
        op: 'archive',
        method: 'POST',
        urlpath: policyRequestPrefix + "/([0-9]+)" + "/archive"
      }

    ];

    PolicyRequests.prototype.list_hook = function(policy) {
      var retainTheseProperties;
      retainTheseProperties = ['id', 'document_type_id', 'name', 'media_type_id', 'environment', 'status', 'tags', 'created_at', 'updated_at','published_at', 'is_archived'];
      policy.id = policy.id;
      return this.deleteSomeProperties(policy, retainTheseProperties);
    };
    PolicyRequests.prototype.create_hook = function(policy) {
      policy.created_at = new Date().toJSON();
      policy.updated_at = new Date().toJSON();
      var draft, drafts = this.listFromOther('drafts');
      var draftsTmp = [];
      for (_i = 0, _len = drafts.length; _i < _len; _i++) {
        draft = drafts[_i];
        if (draft.id != policy.draft_id) {
          draftsTmp.push(draft);
        }
      }
      this.writeObjToJsonFile('drafts', draftsTmp);
      return policy.status = 1;
    };
    PolicyRequests.prototype.update_hook = function(policy) {
      documents = this.listFromOther('policies');
      newdoclist = (function() {
        var _i, _len, _results;
        for (_i = 0, _len = documents.length; _i < _len; _i++) {
          elt = documents[_i];
          if (elt.environment === policy.environment && elt.id !== policy.id) {
            elt.environment = undefined;
          } else {
            continue;
          }
        }
      })();
      this.writeObjToJsonFile('policies', documents);
      policy.published_at = new Date().toJSON();
      return policy.status = 1;
    };

    PolicyRequests.prototype.archive = function(policy,request, cb) {
      var  drafts, _i, _len;
      var documents = this.listFromOther('policies');
      var _i, _len, _results;
      for (_i = 0, _len = documents.length; _i < _len; _i++) {
        elt = documents[_i];
        if (elt.id === parseInt(policy['1'])) {
          policy.updated_at = new Date().toJSON();
          elt.is_archived = true;
          this.writeObjToJsonFile('policies', documents);
          return this.fastReturn(cb, elt);
        }
      }
    };

    PolicyRequests.prototype.duplicate = function(arghash, request, cb) {
      var  drafts, _i, _len;
      var documents = this.listFromOther('policies');
      for (_i = 0, _len = documents.length; _i < _len; _i++) {
        doc = documents[_i];
        if (doc.id == arghash.source_id) {
          var newDraft = {};
          newDraft.id = this.generateId("drafts");
          newDraft.name = "Copy of " + doc.name;
          newDraft.body = doc.body;
          newDraft.created_at = new Date().toJSON();
          newDraft.media_type_id = doc.media_type_id;
          newDraft.draft_type_id = doc.document_type_id;
          drafts = this.listFromOther('drafts');
          drafts.push(newDraft);
          this.writeObjToJsonFile('drafts', drafts);
          return this.fastReturn(cb, newDraft);
        }
      }
    };
    return PolicyRequests;
  })(MockEntity);

  new PolicyRequests();

}).call(this);
