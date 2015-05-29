(function() {
  var MockEntity, dbdir, fs, isArray, isFunction, path, prt, prtj, stype,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  fs = require('fs');

  path = require('path');

  prt = function(s) {
    return console.log(s);
  };

  prtj = function(obj) {
    return prt(JSON.stringify(obj, null, '  '));
  };

  stype = function(obj) {
    if (obj === void 0 || obj === null) {
      return String(obj);
    } else {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
  };

  isFunction = function(obj) {
    return stype(obj) === 'function';
  };

  isArray = function(obj) {
    return stype(obj) === 'array';
  };

  dbdir = 'tools/mockserver/db';

  MockEntity = (function() {
    function MockEntity() {
      MockEntity.entities.push(this);
      this.init();
    }

    MockEntity.prototype.init = function() {};

    MockEntity.prototype.deleteSomeProperties = function(obj, retainedProperties, asitis) {
      if(asitis) return obj;
      var key, _results;
      _results = [];
      for (key in obj) {
        if (__indexOf.call(retainedProperties, key) < 0) {
          _results.push(delete obj[key]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    MockEntity.prototype.fastReturn = function() {
      var args, cb;
      cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!isFunction(cb)) {
        prt('fastReturn called with non function cb');
        console.trace();
      }
      return setTimeout((function() {
        return cb.apply(null, args);
      }), 0);
    };

    MockEntity.prototype.generateId = function(entityType) {
      var initials, serials, _ref;
      serials = this.getObjFromJsonFile('serials', {});
      if (serials[entityType] != null) {
        serials[entityType]++;
      } else {
        initials = {
          fogroups: 201,
          lbgroups: 301,
          msgroups: 401,
          szgroups: 501,
          keys: 601,
          healthchecks: 701,
          zones: 1001,
          fakezones: 2001,
          fakezone_sn: 3001,
          records: 123456,
          mservers: 801
        };
        serials[entityType] = (_ref = initials[entityType]) != null ? _ref : 101;
      }
      this.writeObjToJsonFile('serials', serials);
      return serials[entityType];
    };

    MockEntity.prototype.create = function(arghash, request, cb) {
      var list, newObj;
      newObj = request.jsonObj;
      if(arghash.source_id){
        this.duplicate(arghash,request, cb);
        return;
      } else {
        this.verify_shape(request, this.shape, newObj, {
          creating: true
        });
        if (typeof this.create_hook === "function") {
          this.create_hook(newObj);
        }
      }
      list = this.listFromFile();
      newObj[this.idProp] = this.generateId(this.fname);
      list.push(newObj);
      this.writeObjToJsonFile(this.fname, list);
      return this.fastReturn(cb, {
        id: newObj[this.idProp]
      });
    };
    MockEntity.prototype.duplicate = function(arghash, request, cb) {
      var list, newObj;
      newObj = request.jsonObj;
      console.log(arghash);
      if(arghash.source_id){
        this.duplicate(newObj);
        return;
      } else {
        this.verify_shape(request, this.shape, newObj, {
          creating: true
        });
        if (typeof this.create_hook === "function") {
          this.create_hook(newObj);
        }
      }
      list = this.listFromFile();
      newObj[this.idProp] = this.generateId(this.fname);
      list.push(newObj);
      this.writeObjToJsonFile(this.fname, list);
      return this.fastReturn(cb, {
        id: newObj[this.idProp]
      });
    };

    MockEntity.prototype.read = function(arghash, request, cb, idIndex) {
      var id, obj, object, _i, _len, _ref, _ref1, _ref2;

      id = (_ref = arghash[idIndex]) != null ? _ref : arghash.id;
      object = null;
      _ref1 = this.listFromFile();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        obj = _ref1[_i];
        if (((_ref2 = obj[this.idProp]) != null ? _ref2.toString() : void 0) === id) {
          object = obj;
        }
      }
      if (object == null) {
        request.add_error_msg("no " + this.fname + " found with id " + id);
      }
      if (typeof this.read_hook === "function") {
       var res = this.read_hook(object);
        if(res) object = res;
      }
      return this.fastReturn(cb, object);
    };

    MockEntity.prototype.update = function(arghash, request, cb) {
      var element, newObj, newlist;
      newObj = request.jsonObj;
      this.verify_shape(request, this.shape, newObj, {
        modifying: true
      });
      if (typeof this.update_hook === "function") {
        this.update_hook(newObj);
      }
      newlist = (function() {
        var _i, _len, _ref, _results;
        _ref = this.listFromFile();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (element[this.idProp] === newObj[this.idProp]) {
            _results.push(newObj);
          } else {
            _results.push(element);
          }
        }
        return _results;
      }).call(this);
      this.writeObjToJsonFile(this.fname, newlist);
      return this.fastReturn(cb, {
        id: newObj[this.idProp]
      });
    };

    MockEntity.prototype["delete"] = function(arghash, ignore, cb) {
      var elt, id, list, newlist, value, _ref;
      value = (_ref = arghash[1]) != null ? _ref : arghash.id;
      id = parseInt(value);
      list = this.listFromFile();
      prt("id = " + id + ", arghash = " + (JSON.stringify(arghash)) + ", number of zones is " + list.length);
      newlist = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          elt = list[_i];
          if (elt[this.idProp] !== id) {
            _results.push(elt);
          } else {
            continue;
          }
        }
        return _results;
      }).call(this);
      this.writeObjToJsonFile(this.fname, newlist);
      prt("after write file number of zones is " + newlist.length);
      return this.fastReturn(cb, null);
    };

    MockEntity.prototype.list = function(arghash, ignore, cb) {
      var elt, list, _i, _len;
      list = this.listFromFile();
      var filteredList=[], filtered = false;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        elt = list[_i];
        if(arghash.environment_id){
          if(elt.environment_id === parseInt(arghash.environment_id)){
            filtered = true;
            filteredList.push(elt);
          }
        }
        if (typeof this.list_hook === "function") {
          this.list_hook(elt, arghash);
        }
      }
      if(filtered) list = filteredList;
      return this.fastReturn(cb, list);
    };

    MockEntity.prototype.listFromFile = function() {
      return this.getObjFromJsonFile(this.fname, []);
    };

    MockEntity.prototype.listFromOther = function(fname) {
      return this.getObjFromJsonFile(fname, []);
    };

    MockEntity.prototype.getObjFromJsonFile = function(fname, defaultObj) {
      var fullname, obj;
      fullname = this.fullFileName(fname);
      return obj = fs.existsSync(fullname) ? JSON.parse(fs.readFileSync(fullname, 'utf8')) : defaultObj;
    };

    MockEntity.prototype.writeObjToJsonFile = function(fname, obj) {
      var fullname;
      fullname = this.fullFileName(fname);
      return fs.writeFileSync(fullname, JSON.stringify(obj, null, ' '));
    };

    MockEntity.prototype.fullFileName = function(fname) {
      return path.join(dbdir, fname);
    };

    MockEntity.prototype.generateVersion = function() {
      var d, versionText;
      d = new Date();
      versionText = "" + (d.getFullYear()) + (d.getMonth()) + (d.getDay()) + (d.getHours()) + (d.getSeconds());
      return parseInt(versionText);
    };

    MockEntity.prototype.verify_type_of_value = function(type, value) {
      return (typeof value) === type;
    };

    MockEntity.prototype.mayBeAbsent = function(key, spec, conditions) {
      var cond, _i, _len, _ref;
      if (spec.absentWhen != null) {
        _ref = spec.absentWhen.split(',');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cond = _ref[_i];
          if (cond in conditions) {
            return 'must';
          }
        }
      }
      if (spec.optional != null) {
        return 'yes';
      }
      return 'no';
    };

    MockEntity.prototype.shapeOP_AllowProperties = function(request, obj, shape, conditions) {
      if (request.errors.length > 0) {

      }
    };

    MockEntity.prototype.shapeOP_OR = function(request, obj, shape, conditions) {
      var subshape, _i, _len;
      if (request.errors.length > 0) {
        return;
      }
      for (_i = 0, _len = shape.length; _i < _len; _i++) {
        subshape = shape[_i];
        this.iverify_shape(request, obj, subshape, conditions);
        if (request.errors.length === 0) {
          return;
        } else {
          request.errors = [];
        }
      }
      return request.add_error_msg("none of OR-ed shapes are present");
    };

    MockEntity.prototype.iverify_shape = function(request, obj, shape, conditions) {
      var array, elt, eltShape, key, spec, val, value, _i, _len, _ref, _results;
      if (shape == null) {
        return;
      }
      if (shape.type != null) {
        if (!this.verify_type_of_value(shape.type, obj)) {
          request.add_error_msg("value " + obj + " not of type " + shape.type);
        }
        return;
      }
      if ((typeof obj) !== 'object') {
        request.add_error_msg("value " + obj + " is not an object");
        return;
      }
      for (key in shape) {
        spec = shape[key];
        if (key === 'metadata') {
          continue;
        }
        if (key.indexOf('shapeOP_') === 0) {
          this[key](request, obj, spec, conditions);
          continue;
        }
        if (!(key in obj)) {
          if (this.mayBeAbsent(key, spec, conditions) === 'no') {
            request.add_error_msg("property " + key + " not found");
          }
        } else {
          if (this.mayBeAbsent(key, spec, conditions) === 'must') {
            request.add_error_msg("property " + key + " should not be present");
          }
          value = obj[key];
          if (value === null && spec.nullable) {

          } else if (spec.type != null) {
            if (!this.verify_type_of_value(spec.type, value)) {
              request.add_error_msg("property " + key + ", value " + value + " not of type " + spec.type);
            }
          } else if (spec.isArray != null) {
            if (!isArray(value)) {
              request.add_error_msg("property " + key + ", value " + value + " not an array");
            }
            array = value;
            eltShape = spec.element;
            if (array.length > 0) {
              conditions = JSON.parse(JSON.stringify(conditions));
              conditions.imbedded = true;
              for (_i = 0, _len = array.length; _i < _len; _i++) {
                elt = array[_i];
                this.iverify_shape(request, elt, eltShape, conditions);
              }
            }
          } else {
            if (value === null) {
              if (!(spec != null ? (_ref = spec.metadata) != null ? _ref.nullable : void 0 : void 0)) {
                request.add_error_msg("property " + key + " is null");
              }
            } else {
              conditions = JSON.parse(JSON.stringify(conditions));
              conditions.imbedded = true;
              this.iverify_shape(request, value, spec, conditions);
            }
          }
        }
      }
      if (!'shapeOP_AllowProperties' in shape) {
        _results = [];
        for (key in obj) {
          val = obj[key];
          if (!shape[key]) {
            _results.push(request.add_error_msg("property " + key + " not a valid property name"));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    MockEntity.prototype.verify_shape = function(request, shape, obj, conditions) {
      prt('entering verify_shape, obj is');
      prtj(obj);
      this.iverify_shape(request, obj, shape, conditions);
      return request.throwIfErrors();
    };

    MockEntity.loadEntities = function() {
      var filename, lib, _i, _len, _ref, _results;
      lib = path.dirname(fs.realpathSync(__filename));
      _ref = fs.readdirSync(lib);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        filename = _ref[_i];
        if (/_entity\.js$/.exec(filename)) {
          _results.push(require("./" + filename));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    MockEntity.entities = [];

    MockEntity.getEntity = function(className) {
      var entity, _i, _len, _ref;
      _ref = MockEntity.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if (className === entity.constructor.name) {
          return entity;
        }
      }
      return null;
    };

    MockEntity.decode = function(request, cb) {
      var arghash, assignment, descriptor, e, entity, group, iMethod, index, item, m, method, op, idIndex, parts, pathRe, query, url, urlpath, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
      url = request.url;
      method = request.method;
      if ((request.requestStream.headers.user_id != null) && request.requestStream.headers.user_id !== void 0) {
        dbdir = dbdir + '/' + request.requestStream.headers.user_id;
      }
      if (!fs.existsSync(dbdir)) {
        fs.mkdirSync(dbdir);
      }
      prt("url=" + url);
      parts = url.split('?');
      urlpath = parts[0];
      query = parts[1];
      _ref = MockEntity.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _ref1 = entity.dispatch;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          descriptor = _ref1[_j];
          pathRe = new RegExp(descriptor.urlpath);

          if (method === descriptor.method && (m = pathRe.exec(urlpath)) && m[0] === urlpath) {
            op = descriptor.op;
            idIndex = descriptor.idIndex ? descriptor.idIndex : 1;

            arghash = {};
            for (index = _k = 0, _len2 = m.length; _k < _len2; index = ++_k) {
              group = m[index];
              if (index === 0) {
                continue;
              }
              arghash[index] = m[index];
            }
            if (query != null) {
              _ref2 = query.split('&');
              for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
                assignment = _ref2[_l];
                item = assignment.split('=');
                arghash[item[0]] = item[1];
              }
            }
            iMethod = entity[op];

            try {
              iMethod.call(entity, arghash, request, cb, idIndex);
            } catch (_error) {
              e = _error;
              prt("caught exception, message is " + e.message);
              prt("stack is " + e.stack);
              if (e.message === 'errors') {
                prt("caught 'errors' exception");
              }
              entity.fastReturn(cb, null);
            }
            return;
          }
        }
      }
      request.add_error_msg("unable to decode url " + url);
      return entity.fastReturn(cb, null);
    };

    return MockEntity;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).MockEntity = MockEntity;

}).call(this);
