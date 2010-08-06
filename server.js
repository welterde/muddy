var net  = require('net'),
    ws   = require('websocket-server'),
    fs   = require('fs'),
    yaml = require('yaml'),
    server, mud, config

config = yaml.eval(fs.readFileSync('config.yml', 'utf8'))

server = ws.createServer()
server.addListener('connection', function(connection) {
  mud = net.createConnection(config.port, config.host)
  mud.setEncoding('utf8')

  mud.addListener('data', function(data) {
    connection.write(data + '\n')
  })

  connection.addListener('message', function(message) {
    mud.write(message + '\n')
  })
})

server.listen(6660)
