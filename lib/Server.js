/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

var thrift = require('thrift');

function Server(config) {

  this.config = config;
  //this.config.thriftPath = this.config.thriftPath.replace(/\/$/, '');

  var genPath = (this.config.genPath || sand.appPath + '/thrift/gen-nodejs/');

  var methodsPath = (this.config.methodsPath || sand.appPath + '/thrift/');

  console.log(genPath);

  this.serverClass = require(genPath + this.config.server);
  this.methodsClass = require(methodsPath + this.config.server);
  console.log(config, this);

}

Server.prototype.start = function() {
  this.server = thrift.createServer(this.serverClass, this.methodsClass, {
    transport: this.config.transport ? thrift[this.config.transport] : thrift.TBufferedTransport,
    protocol: this.config.protocol ? thrift[this.config.protocol] : thrift.TBinaryProtocol });

  this.server.listen(this.config.port);
};

Server.prototype.stop = function() {
  this.server.close();
};

module.exports = Server;