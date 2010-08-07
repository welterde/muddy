var sys     = require('sys')
    net     = require('net'),
    ws      = require('websocket-server'),
    fs      = require('fs'),
    yaml    = require('yaml')

var server, mud

var config   = yaml.eval(fs.readFileSync('config/config.yml', 'utf8')),
    aliases  = require('./config/aliases')

server = ws.createServer()
server.addListener('connection', function(connection) {
  mud = net.createConnection(config.port, config.host)
  mud.setEncoding('ascii')

  mud.addListener('data', function(data) {
    connection.write(data + '\n')
  })

  connection.addListener('message', function(message) {
    var alias = aliases[message]
    
    if (alias) {
      alias.forEach(function(command) {
        mud.write(command + '\n')
      })
    } else {
      mud.write(message + '\n')
    }
  })
})

server.listen(6660)
