var fs      = require('fs')
  , net     = require('net')
  , yaml    = require('yaml')
  , express = require('express')
  , io      = require('socket.io')

var config = yaml.eval(fs.readFileSync('config/config.yml', 'utf8'))
  , app    = express.createServer()
  , socket = io.listen(app)

var alias     = require('./lib/alias')
  , trigger   = require('./lib/trigger')
  , formatter = require('./lib/formatter')

app.configure(function() {
  app.use(express.staticProvider(__dirname + '/public'))
})

app.get('/', function(req, res) {
  res.render('index.ejs', {
    layout: false,
    locals: { 'aliases':  alias.list()
            , 'triggers': trigger.list() }
  })
})

app.listen(6660)

socket.on('connection', function(client) {
  var mud = net.createConnection(config.port, config.host)
      mud.setEncoding('ascii')
  
  mud.addListener('data', function(data) {
    var commands  = trigger.scan(data)
      , formatted = formatter.go(data)

    client.send(formatted)

    if (commands) {
      for (var i = 0; i < commands.length; i++) {
        var response = { 'cmd':     'updateSelf'
                       , 'command': commands[i] }

        client.send(response)
        mud.write(commands[i])
      }
    }
  })

  client.on('message', function(data) {
    if (data.match(/^;alias add/i)) {
      alias.create(data, function() {
        var response = { 'cmd':     'updateAliases'
                       , 'aliases': alias.list() }

        client.send(response)
      })
    } else if (data.match(/^;alias rm/i)) {
      alias.remove(data, function() {
        var response = { 'cmd':     'updateAliases'
                       , 'aliases': alias.list() }

        client.send(response) 
      })
    } else if (data.match(/^;trigger add/i)) {
      trigger.create(data, function() {
        var response = { 'cmd':      'updateTriggers'
                       , 'triggers': trigger.list() }

        client.send(response) 
      })
    } else if (data.match(/^;trigger rm/i)) {
      trigger.remove(data, function() {
        var response = { 'cmd':      'updateTriggers'
                       , 'triggers': trigger.list() }

        client.send(response) 
      })
    } else {
      mud.write(alias.format(data))
    }
  })
})
