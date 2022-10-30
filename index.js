const http = require("http");

const representation = require("./representor.js");
const home = require("./connectors/home.js");
const utils = require("./connectors/utils.js");

const reHome = new RegExp("^/home/.*", "i");

function handler(req, res) {
  var flg, doc;
  flg = false;

  try {
    if (flg === false && reHome.test(req.url)) {
      flg = true;
      doc = home(req, res, handleResponse);
    }
  } catch (ex) {}

  if (flg === false) {
    handleResponse(req, res, utils.errorResponse(req, res, "Not Found", 404));
  }
}

function handleResponse(req, res, doc) {
  var rtn = representation(doc.doc);
  sendResponse(req, res, rtn);
}

function sendResponse(req, res, body) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(body);
}

const server = http.createServer(handler);

server.listen(3000);
