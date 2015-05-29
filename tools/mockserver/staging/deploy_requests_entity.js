(function() {
  var MockEntity, DeployRequests, deployRequestPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  deployRequestPrefix = '.*/api/v3/rules/deploy-requests';

  prt = function(s) {
    return console.log(s);
  };

  DeployRequests = (function(_super) {
    __extends(DeployRequests, _super);

    function DeployRequests() {
      return DeployRequests.__super__.constructor.apply(this, arguments);
    }

    DeployRequests.prototype.idProp = 'id';

    DeployRequests.prototype.fname = 'deploy-requests';

    DeployRequests.prototype.dispatch = [
      {
        op: 'create',
        method: 'POST',
        urlpath: deployRequestPrefix
      }, {
        op: 'read',
        method: 'GET',
        urlpath: "" + deployRequestPrefix + "/([0-9]+)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: deployRequestPrefix
      }, {
        op: 'update',
        method: 'PUT',
        urlpath: deployRequestPrefix+ "/([0-9]+)"
      }
    ];

    DeployRequests.prototype.create_hook = function(request) {
        request.created_at = new Date().toJSON();
      request.updated_at = new Date().toJSON();
      return request.state_id = 2;
    };
    DeployRequests.prototype.update_hook = function(request) {
      request.updated_at = new Date().toJSON();
      return request;
    };

    DeployRequests.prototype.list_hook = function(request,arghash) {
      var retainTheseProperties;

      retainTheseProperties = ['id', 'description', 'policy_id','policy_name', 'environment_id', 'created_at', 'updated_at', 'state_id'];
        request.id = request.id;
      return this.deleteSomeProperties(request, retainTheseProperties);
    };

    DeployRequests.prototype.shape = {
      id: {
        type: 'number',
        absentWhen: 'creating'
      },
      policy_id: {
        type: 'number'
      },
      environment_id: {
        type: 'number'
      },
      state_id: {
        type: 'number',
        absentWhen: 'creating'
      }
    };

    return DeployRequests;

  })(MockEntity);

  new DeployRequests();

}).call(this);
