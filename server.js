console.log( "[maystify] starting to load maystify server:" + ( process.env['PORT'] || 8080 ) );
var fs = require('fs');
var http = require('http');
var express = require('express');
var port = process.env['PORT'] || 8080;

// IMPORTS
//

// HELPER FUNCTIONS
//
function path(fname) {
  return __dirname + "/build/" + fname;
}

function staticDir( fname ) {
  return express.static(path( fname ) );
}

// CREATE AND CONFIGURE APP
//
var app = express();

app.use('/images', staticDir('images'));
app.use('/css', staticDir('css'));
app.use('/script', staticDir('script'));

app.get('/:fname', function(req, res){
  var fname=req.params.fname;
  console.log( "[maystify] GET " + fname );
  res.sendFile(path(fname));
});

app.get('/', function(req, res){
  res.sendFile(path("portfolio.html"));
});

// EXPOSE APP THROUGH BOTH HTTP AND HTTPS
//
http.createServer(app).listen(port);
console.log( "[maystify] server listening at:" + port );
