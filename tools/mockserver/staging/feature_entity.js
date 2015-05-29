(function() {
  var MockEntity, Features, matchPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  matchPrefix = '.*/api/v3/rules/matches/(.+)/features';

  prt = function(s) {
    return console.log(s);
  };

  Features = (function(_super) {
    __extends(Features, _super);

    function Features() {
      return Features.__super__.constructor.apply(this, arguments);
    }

    Features.prototype.idProp = 'tag';

    Features.prototype.fname = 'features';

    Features.prototype.dispatch = [
      {
        op: 'read',
        method: 'GET',
        idIndex:2,
        urlpath: "" + matchPrefix + "/(.+)"
      }, {
        op: 'list',
        method: 'GET',
        urlpath: matchPrefix
      }
    ];

    Features.prototype.list_hook = function(match) {
      console.log(match.tag_name);
      var retainTheseProperties;
      retainTheseProperties = ['tag', 'name', 'enabled', 'category_id'];
      match.tag_name = match.tag_name;

      return this.deleteSomeProperties(match, retainTheseProperties);
    };

    Features.prototype.shape = {
      tag: {
        type: 'string'
      },
      name: {
        type: 'string'
      }
    };

    return Features;

  })(MockEntity);

  new Features();

}).call(this);
