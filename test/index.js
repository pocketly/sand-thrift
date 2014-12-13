/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */

var sand = require('sand');
var Thrift = require('..');

console.log(Thrift);

sand({appPath: __dirname }).use(Thrift, {
  servers: [
    {
      host: '127.0.0.1',
      port: 9090,
      server: 'Messenger'
    }
  ],
  clients: [
    {
      host: '127.0.0.1',
      port: 9090,
      server: 'Messenger',
      ttypes: 'test'
    }
  ]
}).start();