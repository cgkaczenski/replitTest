const http = require("http");

const representation = require("./representor.js");
const home = require("./connectors/home.js");
const utils = require("./connectors/utils.js");

const reRoot = new RegExp("^/$", "i");
const reHome = new RegExp("^/home/.*", "i");

var root;

function handler(req, res) {
  var flg, doc;

  root = "//" + req.headers.host;
  flg = false;

  try {
    if (flg === false && reRoot.test(req.url)) {
      handleResponse(req, res, {
        code: 302,
        doc: "",
        headers: { location: "//" + req.headers.host + "/home/" },
      });
    }
  } catch (ex) {}
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
  if (doc !== null) {
    var rtn = representation(doc.doc, root);
    sendResponse(req, res, rtn, doc.code, doc.headers);
  }
  sendResponse(req, res, "Server Response Error", 500);
}

function sendResponse(req, res, body, code, headers) {
  var hdrs;

  if (headers && headers !== null) {
    hdrs = headers;
  } else {
    hdrs = {};
  }

  // Add CORS headers to support external clients
  hdrs["Access-Control-Allow-Origin"] = "*";
  hdrs["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  hdrs["Access-Control-Allow-Credentials"] = true;
  hdrs["Access-Control-Max-Age"] = "86400"; // 24 hours
  hdrs["Access-Control-Allow-Headers"] =
    "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

  res.writeHead(code, hdrs);
  res.end(body);
}

const server = http.createServer(handler);

server.listen(3000);
