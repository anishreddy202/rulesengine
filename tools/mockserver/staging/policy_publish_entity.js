(function() {
  var MockEntity, PolicyPublish, policyPublishPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  policyPublishPrefix = '.*/api/v3/rules/drafts/publish';

  prt = function(s) {
    return console.log(s);
  };

  PolicyPublish = (function(_super) {
    __extends(PolicyPublish, _super);

    function PolicyPublish() {
      return PolicyPublish.__super__.constructor.apply(this, arguments);
    }

    PolicyPublish.prototype.idProp = 'id';

    PolicyPublish.prototype.fname = 'policies';

    PolicyPublish.prototype.dispatch = [
      {
        op: 'create',
        method: 'POST',
        urlpath: policyPublishPrefix
      }
    ];

    PolicyPublish.prototype.create_hook = function(draft) {
      var drafts, elt, newlist;
      draft.status = 2;
      draft.created_at = new Date().toJSON();
      draft.updated_at = new Date().toJSON();
      drafts = this.listFromOther('drafts');
      newlist = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = drafts.length; _i < _len; _i++) {
          elt = drafts[_i];
          if (elt.id !== draft.draft_id) {
            _results.push(elt);
          } else {
            continue;
          }
        }
        return _results;
      })();
      documents = this.listFromOther('policies');
      newdoclist = (function() {
        var _i, _len, _results;
        for (_i = 0, _len = documents.length; _i < _len; _i++) {
          elt = documents[_i];
          if (elt.environment === draft.environment && elt.draft_id !== draft.draft_id && elt.status === 2) {
            elt.environment = undefined;
            return;
          } else {
            continue;
          }
        }
      })();
      this.writeObjToJsonFile('policies', documents);
      return this.writeObjToJsonFile('drafts', newlist);
    };

    PolicyPublish.prototype.shape = {
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
      },
      document_type_id: {
        type: 'number'
      }
    };

    return PolicyPublish;

  })(MockEntity);

  new PolicyPublish();

}).call(this);
