(function() {
  var Handler, LATENCY_FILE, MockEntity, Request, fastReturn, fs, isArray, latency, prt, prtj,
    __slice = [].slice;

  fs = require('fs');

  MockEntity = require('./mockentity').MockEntity;

  prt = function(s) {
    return console.log(s);
  };

  prtj = function(obj) {
    return prt(JSON.stringify(obj, null, '  '));
  };

  fastReturn = function() {
    var args, cb;
    cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return setTimeout((function() {
      return cb.apply(null, args);
    }), 0);
  };

  isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  LATENCY_FILE = 'db/mock-latency';

  latency = 0.0;

  Request = (function() {
    function Request(message) {
      if (message != null) {
        this.method = message.method;
        this.url = message.url;
        this.requestStream = message;
      }
      this.errors = [];
      if (fs.existsSync(LATENCY_FILE)) {
        latency = parseFloat(fs.readFileSync(LATENCY_FILE, 'utf8'));
      } else {
        latency = 0.0;
      }
    }

    Request.prototype.setBody = function(inputBody) {
      this.inputBody = inputBody;
    };

    Request.prototype.get_body = function(cb) {
      var text;
      if (this.inputBody != null) {
        this.fastReturn(cb, this.inputBody);
        this.inputBody = null;
        return;
      }
      this.requestStream.setEncoding('utf8');
      text = '';
      this.requestStream.on('data', function(chunk) {
        return text += chunk;
      });
      return this.requestStream.on('end', function() {
        return cb(text);
      });
    };

    Request.prototype.get_json_body = function(cb) {
      return this.get_body(function(text) {
        var obj;
        if (text.length >= 2) {
          obj = JSON.parse(text);
        } else {
          obj = null;
        }
        return cb(obj);
      });
    };

    Request.prototype.decodeUrl = function(method, url, cb) {
      this.method = method;
      this.url = url;
      return this.decode(cb);
    };

    Request.prototype.decodeNow = function(cb) {
      return this.get_json_body((function(_this) {
        return function(obj) {
          _this.jsonObj = obj;
          return MockEntity.decode(_this, cb);
        };
      })(this));
    };

    Request.prototype.decode = function(cb) {
      var milliseconds;
      if ((latency != null) && this.url.indexOf('/latency') !== 0) {
        milliseconds = Math.floor(latency * 1000);
        return setTimeout(((function(_this) {
          return function() {
            return _this.decodeNow(cb);
          };
        })(this)), milliseconds);
      } else {
        return this.decodeNow(cb);
      }
    };

    Request.prototype.setRequestStream = function(requestStream) {
      this.requestStream = requestStream;
    };

    Request.prototype.add_error_msg = function(msg) {
      //prt("ERROR:" + msg);
      //return this.errors.push(msg);
      this.errors = {};
      this.errors.code = "BadRequest";
      this.errors.message = msg;
      return this.errors;

    };

    Request.prototype.setLatency = function(arghash, cb) {
      var str;
      str = arghash.seconds;
      latency = parseFloat(str);
      fs.writeFileSync(LATENCY_FILE, JSON.stringify(latency));
      return fastReturn(cb, latency);
    };

    Request.prototype.generateVersion = function() {
      var d, versionText;
      d = new Date();
      versionText = "" + (d.getFullYear()) + (d.getMonth()) + (d.getDay()) + (d.getHours()) + (d.getSeconds());
      return parseInt(versionText);
    };

    Request.prototype.throwIfErrors = function() {
      if (this.errors.length > 0) {
        throw new Error('errors');
      }
    };

    return Request;

  })();

  Handler = (function() {
    function Handler() {
      var debug;
      debug = 0;
    }

    Handler.prototype.setDebug = function() {
      return debug++;
    };

    Handler.prototype.handler = function(message, res) {
      var request;
      request = new Request(message);
      prt("request received, method=" + message.method + ", url=" + message.url);
      res.setHeader('Content-Type', 'application/json');
      return request.decode(function(obj) {
        var body;
        if (request.errors.length === 0) {
          body = JSON.stringify(obj);
          res.writeHead(200, {
            'Content-Type': 'Application/json'
          });
          return res.end(body);
        } else {
          body = JSON.stringify(request.errors);
          res.writeHead(400, {
            'Content-Type': 'Application/json'
          });
          return res.end(body);
        }
      });
    };

    Handler.prototype.serverLoop = function() {
      return require('http').createServer(this.handler).listen(1447);
    };

    return Handler;

  })();

  module.exports = {
    Handler: Handler,
    Request: Request
  };

}).call(this);
