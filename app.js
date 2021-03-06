// Simple echo for GitHub webhook testing
var http = require('http');
const config = require('./config/config');
const util = require('util');
var createHandler = require('github-webhook-handler');
var handler = createHandler({
  path: '/webhook',
  secret: config.secret
});

var server = http.createServer(function (req, res) {
  //console.log('QQQ req: ' + util.inspect(req));
  //console.log('QQQ res: ' + util.inspect(res));
  handler(req, res, function (err) {
    console.error('Server error: ' + res.error);
    res.statusCode = 404;
    res.statusMessage = 'no such location';
    // res.end('no such location');
  });
}).listen(config.port, () => {
  console.log('Running in ' + process.env.NODE_ENV + ' as ' + config.app.name + ' with secret ' + config.secret);
  console.log('Express server listening on port ' + config.port);
});

var close = function () {
  server.close();
};
handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
});

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title);
});

module.exports = server;
