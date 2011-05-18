var fs      = require('fs')
  , net     = require('net')
  , express = require('express')
  , io      = require('socket.io')

var alias     = require('./lib/alias')
  , trigger   = require('./lib/trigger')
  , formatter = require('./lib/formatter')

var config = JSON.parse(fs.readFileSync('config/config.json', 'utf8'))
  , app    = express.createServer()
  , socket = io.listen(app)

var createResponse = function(command, data) {
  return { command: command, data: data }
}

app.configure(function() {
  app.set('views', __dirname + '/views')
  app.use(express.static(__dirname + '/public'))
})

app.get('/', function(req, res) {
  res.render('index.ejs', { layout: false })
})

app.listen(6660)

socket.on('connection', function(client) {
  var mud = net.createConnection(config.port, config.host)
      mud.setEncoding('ascii')
  
  mud.addListener('data', function(data) {
    var commands  = trigger.scan(data)
      , formatted = formatter.go(data)
      , lines     = formatted.split('\r\n')

    client.send(createResponse('updateWorld', formatted))
    
    if (commands) {
      for (var i = 0; i < commands.length; i++) {
        mud.write(commands[i])
      }
    }
  })

  client.on('message', function(data) {
    if (data.match(/^;alias add/i)) {
      alias.create(data)
    } else if (data.match(/^;alias ls/i)) {
      client.send(createResponse('listAliases', alias.list()))
    } else if (data.match(/^;alias rm/i)) {
      alias.remove(data)
    } else if (data.match(/^;trigger add/i)) {
      trigger.create(data)
    } else if (data.match(/^;trigger ls/i)) {
      client.send(createResponse('listTriggers', trigger.list()))
    } else if (data.match(/^;trigger rm/i)) {
      trigger.remove(data)
    } else {
      mud.write(alias.format(data))
    }
  })
})
