var express = require('express');
var path = require('path');
var Habitat = require('habitat');

Habitat.load();

var env = new Habitat();
var app = express();
var port = env.get('PORT');
var db = require('./db')(env.get('DB_NAME'), env.get('DB_USER'), env.get('DB_PASSWORD'), env.get('SQL_LOGGING'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());

app.use(express.static(__dirname + '/app'));

app.use(app.router);

var base = '/api';

function verifyModel(req, res, next) {
  var modelName = req.params.model;

  if (!db[modelName]) {
    return res.send('Error, no model called ' + modelName);
  }
  req.modelName = modelName;
  next();
}

app.get( base + '/all/:model', verifyModel, function(req, res) {
  db[req.modelName]
    .findAll()
    .success(function(data) {
      res.json(data);
    });
});

app.get( base + '/:model/:id', verifyModel, function(req, res) {
  db[req.modelName]
    .find(req.params.id)
    .success(function(data) {
      res.json(data);
    });
});

app.get( base + '/:model/:id', verifyModel, function(req, res) {
  db[req.modelName]
    .find(req.params.id)
    .success(function(data) {
      res.json(data);
    });
});

app.get( base + '/chapters/:id', function(req, res) {
  db.work
    .find(req.params.id)
    .include('chapter')
    .success(function(data) {
      res.json(data);
    });
});


app.listen(port, function() {
  console.log("Now listening on port " + port);
});

