/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

var sand = require('sand');
var thrift = require('thrift');

var ThriftTransports = require('thrift/lib/thrift/transport');
var ThriftProtocols = require('thrift/lib/thrift/protocol');

//var Thrift = require('..');
var Messenger = require('./thrift/gen-nodejs/Messenger');
var ttypes = require('./thrift/gen-nodejs/test_types');


var server = thrift.createServer(Messenger, {
  send: function(message, result) {
    result(null, 'Hi, I\'m here!');
  }
}, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
});

server.listen(9090);


var transport = ThriftTransports.TBufferedTransport();
var protocol = ThriftProtocols.TBinaryProtocol();

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  console.log(err);
  process.exit(1);
});

var TIMEOUT = 1000;
var client = thrift.createClient(Messenger, connection);

runConversation('Are you there?!');

function runConversation(message) {
  console.log('client: ' + message);
  client.send(message, function(err, result) {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    console.log('server: ' + result);
    setTimeout(function() {
      runConversation(message);
    }, TIMEOUT);
  });
}