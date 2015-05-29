(function() {
  var MockEntity, Lookup, matchPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  matchPrefix = '.*/api/v3/rules/lookup';

  prt = function(s) {
    return console.log(s);
  };

  Lookup = (function(_super) {
    __extends(Lookup, _super);

    function Lookup() {
      return Lookup.__super__.constructor.apply(this, arguments);
    }

    Lookup.prototype.idProp = 'id';

    Lookup.prototype.fname = 'lookup';

    Lookup.prototype.dispatch = [
      {
        op: 'read',
        method: 'GET',
        urlpath: "" + matchPrefix + "/(.*)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: matchPrefix
      }
    ];

    Lookup.prototype.list_hook = function(match) {
      var retainTheseProperties;
      retainTheseProperties = ['id', 'state_types','category'];

      return this.deleteSomeProperties(match, retainTheseProperties);
    };
    Lookup.prototype.read_hook = function(lookup) {
      var retainTheseProperties = ['id', 'name'];
      return this.deleteSomeProperties(lookup.result, retainTheseProperties, true) ;
    };

    Lookup.prototype.shape = {
      id: {
        type: 'number'
      }
    };

    return Lookup;

  })(MockEntity);

  new Lookup();

}).call(this);
