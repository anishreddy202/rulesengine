(function() {
  var MockEntity, PolicyArchive, policyDraftPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  policyDraftPrefix = '.*/api/v3/rules/archive';

  prt = function(s) {
    return console.log(s);
  };

  PolicyArchive = (function(_super) {
    __extends(PolicyArchive, _super);

    function PolicyArchive() {
      return PolicyArchive.__super__.constructor.apply(this, arguments);
    }

    PolicyArchive.prototype.idProp = 'id';

    PolicyArchive.prototype.fname = 'policy-archive';

    PolicyArchive.prototype.dispatch = [
      {
        op: 'read',
        method: 'GET',
        urlpath: "" + policyDraftPrefix + "/([0-9]+)"
      }, {
        op: 'read',
        method: 'GET',
        urlpath: policyDraftPrefix
      }, {
        op: 'list',
        method: 'GET',
        urlpath: policyDraftPrefix
      }, {
        op: 'duplicate',
        method: 'GET',
        urlpath: policyDraftPrefix + "/duplicate"
      }
    ];

    PolicyArchive.prototype.list_hook = function(policy) {
      var retainTheseProperties;
      retainTheseProperties = ['id', 'name', 'media_type_id', 'environment', 'status', 'last_activity_log', 'draft_type_id', 'tag'];
      policy.id = policy.id;
      return this.deleteSomeProperties(policy, retainTheseProperties);
    };

    PolicyArchive.prototype.duplicate = function(arghash, request, cb) {
      var draft, drafts, _i, _len;
      drafts = this.listFromOther('drafts');
      for (_i = 0, _len = drafts.length; _i < _len; _i++) {
        draft = drafts[_i];
        if (draft.id = arghash.id) {
          draft.id = this.generateId(this.fname);
          drafts.push(draft);
          this.writeObjToJsonFile(this.fname, drafts);
          return this.fastReturn(cb, draft);
        }
      }
    };

    PolicyArchive.prototype.shape = {
      id: {
        type: 'number'
      },
      media_type_id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      body: {
        type: 'string'
      },
      draft_id_type: {
        type: 'number'
      },
      tag: {
        type: 'string'
      }
    };

    return PolicyArchive;

  })(MockEntity);

  new PolicyArchive();

}).call(this);
