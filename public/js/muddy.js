$(function() {
  var world   = new World('#world')
    , socket  = io.connect('http://localhost')
  
  var resizeUI = function() {
    $('#input input').width(window.innerWidth - 30)
    $('.output').height(window.innerHeight - 115)
    $('.output').attr({ scrollTop: $('.output').attr('scrollHeight') })
  }

  resizeUI()

  socket.on('connect', function() {
    $('input').focus()

    $('input').keyup(function(event) {
      if (event.keyCode == 13) {
        socket.emit('message', $('input').val())
        world.selfMesssage($('input').val())
        world.updateHistory($('input').val())
        
        $('input').val('')
      } else if (event.keyCode == 38) {
        if (world.history[world.current - 1]) {
          $('input').val(world.history[world.current -= 1])
        }
      } else if (event.keyCode == 40) {
        if (world.history[world.current]) {
          $('input').val(world.history[world.current += 1])
        }
      }
    })

    window.onresize = function(event) {
      resizeUI()
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
