const http = require('http');
const representation = require('./representor.js');
const home = require('./connectors/home.js');

function handler(req, res) {
  var doc = home(req, res, handleResponse);
}

function handleResponse(req, res, doc) {
  var rtn = representation(doc.doc);
  sendResponse(req, res, rtn);
}

function sendResponse(req, res, body) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(body);
}

const server = http.createServer(handler);


server.listen(3000);