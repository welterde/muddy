var net = require('net'),
    ws  = require('websocket-server'),
    server, mud

server = ws.createServer()
server.addListener('connection', function(connection) {
  mud = net.createConnection(3000, 'primordiax.com')
  mud.setEncoding('utf8')

  mud.addListener('data', function(data) {
    connection.write(data + '\n')
  })

  connection.addListener('message', function(message) {
    mud.write(message + '\n')
  })
})

server.listen(6660)
