module.exports = main;

function main(req, res, respond) {
  respond(req, res, {
    doc: {
      data: 'Hello World!'
    }
  });
}