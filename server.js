//var express = require('express');

require('./tools/mockserver/staging/mockentity').MockEntity.loadEntities();

var restify = require('restify'),
    nstatic = require('node-static'),
    Mock = require('./tools/mockserver/staging/mockhandler').Request,
    server = restify.createServer(),
    api = new Mock(),
    http = require('http');

var file = new nstatic.Server('./dist');
var port = process.env.PORT || 3001;
var isAPIReady = false; //Toggle to hit API

function directToAPI(request, response){
  var host="dev-api.edgecast.com";
  var headers ={
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFZGdlQXV0aERldiIsImF1ZCI6ImFwaS1jbGllbnRzIiwibmJmIjoxNDA4NDY0Mjk5LCJleHAiOjE0NDAwMjEyMzksImNsaWVudF9pZCI6ImRldi1tY2NjbGllbnQiLCJzY29wZSI6InJlYWQifQ.uYyRljulgnAihqRpB2dlyAiMcBjkrlRy13wclE1WV_w',
  Portals_UserId: 4,
  Portals_CustomerId: 53765,
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Portals_PortalTypeId': 1,
  'Portals_ImpersonateUserId': 21,
  'Portals_ImpersonatePortalTypeId': 4
  };

  var options = {
    host: host ,
    path: request.url.split('/api')[1],
    method: request.method,
    headers: headers
  };
  var req = http.request(options, function(res) {
    //console.log("<<<<< response from dev api >>>>>>");
    //console.log(res);
    res.setEncoding('utf-8');
    var responseString = '';
    res.on('data', function(data) {
      responseString += data;
    });
    res.on('end', function() {
      var responseObject = JSON.parse(responseString);
      response.end(JSON.stringify(responseObject));
      //response.json(responseObject);
      //success(responseObject);
    });
  });
  if(request.method === 'POST' || request.method === 'PUT'){
    request.setEncoding('utf8');
    text = '';
    request.on('data', function(chunk) {
      return text += chunk;
    });
    request.on('end', function() {
      req.write(text);
      req.end();
    });
  } else {
    req.write('');
    req.end();
  }
}

function directToMock(req, res) {
  var api = new Mock(req);
  console.log(req.url);
  api.decode(function(data) {
    console.log(api.errors);
    if (api.errors.message) {
      data = api.errors;
      data.detail = ["Sample Message : This WAF Instanse Id 53765-10666 does not exist for this customer.",
                     "Sample Message : This Customer Origin /80D2fg05/HOOMAN/ does not exist for this customer."];
      res.status(400);
    }
    res.end(JSON.stringify(data));
  });
};

function callDecodeUrl(request, response){
  if(isAPIReady){
    return directToAPI(request, response);
  } else {
    return directToMock(request, response);
  }
};

server.post(/^\/api\//, callDecodeUrl);
server.get(/^\/api\//, callDecodeUrl);
server.put(/^\/api\//, callDecodeUrl);
server.del(/^\/api\//, callDecodeUrl);

server.get(/^\/.*/, function(req, res, next) {
  if(req.url == "/"){
    file.serveFile('index.html', 200, {'Content-Type': 'text/html'}, req, res);
  } else{
    file.serve(req, res, function (err) {
      if (err) {
        throw err;
      }
      next();
    });
  }
});

server.listen(port);
console.log(">>>>>>>>>>>>>Server running on port >>>>>>>>>>>>>>'" + port);
