/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */

var sand = require('sand');
var thrift = require('thrift');
var SpiritModule = require('sand-grain');
var Server = require('./Server');
var Client = require('./Client');

function Thrift() {
  this.super();
}

require('sand').Extend(Thrift, SpiritModule, {

  name: 'thrift',

  init: function(config) {
    this.super(config);
    this.log('Initializing...');

    this.servers = [];
    this.clients = [];

    if (config.servers) {
      config.servers.forEach(function (config) {
        var server = new Server(config);
        this.servers.push(server);
        server.start();
      }.bind(this));
    }

    if (config.clients) {
      config.clients.forEach(function(config) {
        var client = new Client(config);
        this.clients.push(client);
      }.bind(this));
    }

    return this;
  },

  shutdown: function() {
    this.servers.forEach(function(server) {
      server.stop();
    }.bind(this));
  }
});

module.exports = Thrift;