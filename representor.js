const json = require("./representors/json.js");

module.exports = main;

function main(object, root) {
  var doc = json(object, root);
  return doc;
}
