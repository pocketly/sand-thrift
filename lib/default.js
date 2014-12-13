/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

module.exports = {
  servers: [
    {
      server: 'ServerClass',
      host: '127.0.0.1',
      port: 9001,
      transport: 'TTransportClass',
      protocol: 'TProtocolClass'
    }
  ],
  clients: [
    {
      server: 'ServerClass',
      ttypes: 'test',
      host: '127.0.0.1',
      port: 9001,
      transport: 'TTransportClass',
      protocol: 'TProtocolClass',
    }
  ]
};