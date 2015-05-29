(function() {
  var MockEntity, Matches, matchPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  matchPrefix = '.*/api/v3/rules/matches';

  prt = function(s) {
    return console.log(s);
  };

  Matches = (function(_super) {
    __extends(Matches, _super);

    function Matches() {
      return Matches.__super__.constructor.apply(this, arguments);
    }

    Matches.prototype.idProp = 'tag';

    Matches.prototype.fname = 'matches';

    Matches.prototype.dispatch = [
      {
        op: 'read',
        method: 'GET',
        urlpath: "" + matchPrefix + "/(.+)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: matchPrefix
      }
    ];

    Matches.prototype.list_hook = function(match) {
      var retainTheseProperties;
      retainTheseProperties = ['tag', 'name', 'enabled', 'category_id'];

      return this.deleteSomeProperties(match, retainTheseProperties);
    };

    Matches.prototype.shape = {
      tag: {
        type: 'string'
      },
      name: {
        type: 'string'
      }
    };

    return Matches;

  })(MockEntity);

  new Matches();

}).call(this);
