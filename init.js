var fs      = require('fs')
  , net     = require('net')
  , yaml    = require('yaml')
  , express = require('express')
  , io      = require('socket.io')

var config = yaml.eval(fs.readFileSync('config/config.yml', 'utf8'))
  , app    = express.createServer()
  , socket = io.listen(app)

var Alias = require('./lib/alias')

var format = function(data) {
  data = data + '\n'

  return data.replace(/;40/g,     '')
             .replace(/�/g,       '')
             .replace(/\[0m/g,    "</span>")
             .replace(/\[0;30m/g, "<span class='black'>")
             .replace(/\[1;30m/g, "<span class='black bold'>")
             .replace(/\[0;31m/g, "<span class='red'>")
             .replace(/\[1;31m/g, "<span class='red bold'>")
             .replace(/\[0;32m/g, "<span class='green'>")
             .replace(/\[1;32m/g, "<span class='green bold'>")
             .replace(/\[0;33m/g, "<span class='yellow'>")
             .replace(/\[1;33m/g, "<span class='yellow bold'>")
             .replace(/\[0;34m/g, "<span class='blue'>")
             .replace(/\[1;34m/g, "<span class='blue bold'>")
             .replace(/\[0;35m/g, "<span class='magenta'>")
             .replace(/\[1;35m/g, "<span class='magenta bold'>")
             .replace(/\[0;36m/g, "<span class='cyan'>")
             .replace(/\[1;36m/g, "<span class='cyan bold'>")
             .replace(/\[0;37m/g, "<span class='white'>")
             .replace(/\[1;37m/g, "<span class='white bold'>")
             .replace(/\[1m/g,    "<span class='bold'>")
             .replace(/\[3m/g,    "<span class='italic'>")
             .replace(/\[4m/g,    "<span class='underline'>")
             .replace(/\[22m/g,   "<span class='no-bold'>")
             .replace(/\[23m/g,   "<span class='no-italic'>")
             .replace(/\[24m/g,   "<span class='no-underline'>")
}

app.configure(function() {
  app.use(express.staticProvider(__dirname + '/public'))
})

app.get('/', function(req, res) {
  res.render('index.ejs')
})

app.listen(6660)

socket.on('connection', function(client) {
  var mud   = net.createConnection(config.port, config.host)
    , alias = new Alias(client)
  
  mud.setEncoding('ascii')
  mud.addListener('data', function(data) {
    var data = data
    
    client.send(format(data))
  })

  client.on('message', function(data) {
    if (data.match(/^;alias add/)) {
      alias.create(data)
    } else if (data.match(/^;alias ls/i)) {
      alias.show()
    } else if (data.match(/^;alias rm /i)) {
      alias.remove(data)
    } else {
      mud.write(alias.format(data))
    }
  })
})
