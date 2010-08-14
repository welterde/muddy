var sys  = require('sys')
    net  = require('net'),
    ws   = require('websocket-server'),
    fs   = require('fs'),
    yaml = require('yaml')

var server, mud,
    cache = []

var config  = yaml.eval(fs.readFileSync('config/config.yml', 'utf8')),
    aliases = require('./config/aliases')

server = ws.createServer()
server.addListener('connection', function(connection) {
  if (!mud) {
    mud = net.createConnection(config.port, config.host)
    mud.setEncoding('ascii')
  }

  connection.write(cache.join(''));

  mud.addListener('data', function(data) {
    var data = data + '\n'

    if (cache.length == 6) {
      cache.shift();
    }

    connection.write(data)
    cache.push(data)
  })

  connection.addListener('message', function(message) {
    var commands = aliases[message]
    
    if (commands) {
      commands.forEach(function(command) {
        mud.write(command + '\n')
      })
    } else {
      mud.write(message + '\n')
    }
  })
})

server.listen(6660)
