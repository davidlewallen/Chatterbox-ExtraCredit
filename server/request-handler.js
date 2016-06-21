//
//
// You should implement your request handler function in this file.
//
// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.
//
// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.
//
// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
//
//
//var index = require('../client/index.html')
var fs = require('fs')
// Export function (instead of an object) as this file's "return value"
module.exports = requestHandler;

var lastMessage = {
  username: null,
  message: null
}

function requestHandler (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  // if(request.method === 'GET' && request.url === '/'){
  //   var obj = {};
  //   response.writeHead(200,
  //   {
  //     'Content-Type': 'text/html'
  //   })
  //   fs.readFile('../client/index.html', function(err, dataHTML){
  //     response.end(dataHTML.toString())
  //   })
  //   // response.end(JSON.stringify(index));
  // }
  // else if(request.method === 'GET' && request.url === '/styles/styles.css'){
  //   var obj = {};
  //   response.writeHead(200,
  //   {
  //     'Content-Type': 'text/css'
  //   })
  //   fs.readFile('../styles/styles.css', function(err, dataCSS){
  //     console.log(dataCSS)
  //     console.log(err)
  //   })
  // }

  if(request.url === '/classes/messages' || request.url === '/classes/room1'){
    if(request.method === 'GET'){
      var results = {
        results: [{username: lastMessage.username, message: lastMessage.message}]
      }
      response.writeHead(200, {
        'Content-Type': 'application/json',
      })
      response.end(JSON.stringify(results));
    } else if(request.method === 'POST') {
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      })
      request.on('end', function() {
        body = JSON.parse(body);

      // Assigning last message
      if(body.username && body.message){
        lastMessage.username = body.username;
        lastMessage.message = body.message;

        var results = {
          results: [{username: body.username, message: body.message}]
        }
      }

      response.writeHead(201, {
        'Content-Type': 'application/json',
      })
      response.end(JSON.stringify(results));

      })

    }
} else {
      response.writeHead(404, {});
      response.end(JSON.stringify({}));
    }

// -----------------------------------------
  // var lastMessage = {
  //   username: null,
  //   message: null
  // }

  // if(request.method === 'GET' && request.url === '/classes/messages' || request.url === '/classes/room1' || request.url === '/classes/room'){
  //   var body = {results: [lastMessage]};
  //   response.writeHead(200, {
  //     'Content-Type': 'application/json',
  //   })
  //   console.log('Last message:', lastMessage);
  //   response.end(JSON.stringify(body))
  // } else {
  //   response.writeHead(404)
  // }
  // if(request.method === 'GET' && request.url === '/classes/room1'){
  //   var body = {results: []};
  //   response.writeHead(200, {
  //     'Content-Type': 'application/json',
  //   })
  //   response.end(JSON.stringify(body))
  // } else {
  //   response.writeHead(404)
  // }
  // if(request.method === 'POST' && request.url === '/classes/messages'){
  //   console.log("point");
  //   var body = '';
  //   request.on('data', function(chunk) {
  //     body += chunk;
  //   })
  //   request.on('end', function() {
  //     body = JSON.parse(body);
  //     console.log("WTF:", body)
  //     //body = JSON.parse(body);
  //   // at this point, `body` has the entire request body stored in it as a string
  //   lastMessage.username = body.username;
  //   lastMessage.message = body.message;
  //   var results = [{username: body.username, message: body.message}]



  //   response.writeHead(201, {
  //     'Content-Type': 'application/json',
  //   })
  //   response.end(JSON.stringify(results))

  // })
  // } else {
  //   response.writeHead(404)
  // }
// -------------------------------------

  // // Do some basic logging.
  // //
  // // Adding more logging to your server can be an easy way to get passive
  // // debugging help, but you should always be careful about leaving stray
  // // console.logs in your code.
  // console.log("Serving request type " + request.method + " for url " + request.url);

  // // The outgoing status.
  // var statusCode = 200;

  // // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // // Tell the client we are sending them plain text.
  // //
  // // You will need to change this if you are sending something
  // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() - Node may not send
  // // anything back to the client until you do. The string you pass to
  // // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // //
  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
  // response.end("Hello, World!");

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
