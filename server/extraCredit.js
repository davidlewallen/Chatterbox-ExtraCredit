var fs = require('fs')

module.exports = requestHandler;

var data = {
  results: [{
      text:"testText", 
      username: "Jimbo",
      roomname:"testRoom", 
    },]}

function requestHandler (request, response) {
  if(request.method === 'GET') {
    if(request.url === '/') {
      response.writeHead(200, {
        'content-type': 'text/html'
      })
      fs.readFile('../client/index.html', function(err, data) {
        console.log(err);
        response.end(data.toString());
      })
    } else if(request.url === '/styles/styles.css') {
      response.writeHead(200, {
        'content-type': 'text/css',
      })
      fs.readFile('../client/styles/styles.css', function(err, data) {
        console.log(err)
        response.end(data.toString());
      })
    } else if(request.url === '/bower_components/jquery/jquery.min.js') {
      response.writeHead(200, {
        'content-type': 'application/javascript'
      })
      fs.readFile('../client/bower_components/jquery/dist/jquery.min.js', function(err, data) {
        console.log(err);
        response.end(data.toString());
      })
    } else if(request.url === '/bower_components/underscore/underscore-min.js') {
      response.writeHead(200, {
        'content-type': 'application/javascript'
      })
      fs.readFile('../client/bower_components/underscore/underscore-min.js', function(err, data) {
        console.log(err);
        response.end(data.toString());
      })
    } else if(request.url === '/scripts/Model.js') {
      response.writeHead(200, {
        'content-type': 'application/javascript'
      })
      fs.readFile('../client/scripts/Model.js', function(err, data) {
        console.log(err);
        response.end(data.toString());
      })
    } else if(request.url === '/scripts/app.js') {
      response.writeHead(200, {
        'content-type': 'application/javascript'
      })
      fs.readFile('../client/scripts/app.js', function(err, data) {
        console.log(err);
        response.end(data.toString());
      })
    } else if(request.url === '/server/fetchData') {
      
      response.writeHead(200, {
        'content-type': 'application/json'
      })
      response.end(JSON.stringify(data))
    }
  } else if(request.method === 'POST') {
    if(request.url === "/server/addMessage") {
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      })
      request.on('end', function() {
        body = JSON.parse(body);
        data.results.push(body)
      })
    }
  } else {
  }


};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
