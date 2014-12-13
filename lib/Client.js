/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */

var thrift = require('thrift');
var ThriftTransports = require('thrift/lib/thrift/transport');
var ThriftProtocols = require('thrift/lib/thrift/protocol');


function Client(config) {
  this.config = config;

  var genPath = (this.config.genPath || sand.appPath + '/thrift/gen-nodejs/');

  this.serverClass = require(genPath + this.config.server);
  this.ttypes = require(genPath + this.config.ttypes + '_types');

  this._transport = ThriftTransports[this.config.transport || 'TBufferedTransport']();
  this._protocol = ThriftProtocols[this.config.protocol || 'TBinaryProtocol']();

}


/**
 *  Gets a connection to thrift
 *
 * @param callback(err, client, connection)
 */
Client.prototype.getConnection = function(callback) {
  var msg = this.config.host + ':' + this.config.port;
  this.log('connecting to ' + msg);

  var conn = thrift.createConnection(this.config.host, this.config.port, {
    transport : this._transport,
    protocol : this._protocol
  });

  callback(null, conn);

  //conn.on('connect', function() {
  //  this.log('connected to ' + msg);
  //  var client = thrift.createClient(this.serverClass, conn);
  //  callback.call(this, null, client, conn);
  //}.bind(this));
  //
  //conn.on('close', function() {
  //  this.log('disconnected from ' + msg);
  //}.bind(this));
  //
  //conn.on('error', function(err) {
  //  console.error(err);
  //  callback.call(this, err);
  //}.bind(this));
};

module.exports = Client;