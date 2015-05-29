(function() {
  var MockEntity, Policies, policiesPrefix, prt,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MockEntity = require('./mockentity').MockEntity;

  policiesPrefix = '.*/staging/policies/availablematchfeatures';

  prt = function(s) {
    return console.log(s);
  };

  Policies = (function(_super) {
    __extends(Policies, _super);

    function Policies() {
      return Policies.__super__.constructor.apply(this, arguments);
    }

    Policies.prototype.dispatch = [
      {
        op: 'list',
        method: 'GET',
        urlpath: policiesPrefix
      }
    ];

    Policies.prototype.list = function(arghash, request, cb) {
      var availmatchfeatures;
      availmatchfeatures = "{ matches:[ { code:match.always, name:Always, features:[ { code:feature.bwlimit, name:Bandwidth Parameters }, { code:feature.bypass-cache, name:Bypass Cache }, { code:feature.connection-bandwidth-throttling, name:Bandwidth Throttling }, { code:feature.send-age-header, name:Age Response Header } ] }, { code:match.asn, name:AS Number, features:[ { code:feature.cache-methods, name:Cacheable HTTP Methods }, { code:feature.max-cacheable-request-body, name:Cacheable Request Body Size } ] } ] }";
      return this.fastReturn(cb, availmatchfeatures);
    };

    return Policies;

  })(MockEntity);

  new Policies();

}).call(this);
