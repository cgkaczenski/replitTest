module.exports = json;

function json(object) {
  var i, x;

  for (var p in object) {
    switch (p) {
      case "actions":
        delete object[p];
        break;
      default:
        delete object[p].actions;
        if (object[p].data) {
          object[p] = object[p].data;
          delete object[p].data;
        }
        break;
    }
  }

  return JSON.stringify(object, null, 2);
}
