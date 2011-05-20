$(function() {
  var world  = new World('#world')
    , socket = new io.Socket('localhost', { port: 6660 })
  
  world.resize()
  socket.connect()

  socket.on('connect', function() {
    $('input').focus()

    $('input').keyup(function(event) {
      if (event.keyCode == 13) {
        socket.send($('input').val())
        world.selfMesssage($('input').val())
        
        $('input').val('')
      }
    })

    window.onresize = function(event) {
      world.resize()
    }
  })

  socket.on('message', function(message) {
    var command = message.command
      , data    = message.data

    if (command == 'updateWorld') {
      world.update(data)
    } else if (command == 'listAliases') {
      world.listAliases(data)
    } else if (command == 'listTriggers') {
      world.listTriggers(data)
    }
  })
})
