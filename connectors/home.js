module.exports = main;

function main(req, res, respond) {
  var doc, coll, root, data, related, content;

  root = "//" + req.headers.host;
  coll = [];
  data = "Hello World!!";
  related = {};
  content = "";

  content = '<div class="ui segment">';
  content += "<h3>Welcome to TPS at BigCo!</h3>";
  content += "<p><b>Select one of the following actions:</b></p>";
  content += "<ul>";
  content +=
    '<li><a href="/task/" rel="collection /rels/task">Manage Tasks<a/></li>';
  content +=
    '<li><a href="/user/" rel="collection /rels/user">Manage Users<a/></li>';
  content += "</ul>";
  content += "</div>";

  // compose graph
  doc = {};
  doc.title = "TPS - Task Processing System";
  doc.data = data;
  doc.actions = coll;
  doc.content = content;
  doc.related = related;

  respond(req, res, {
    code: 200,
    doc: {
      home: doc,
    },
  });
}
