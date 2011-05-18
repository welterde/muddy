var lockScroll = function() {
  $('#world').attr({ scrollTop: $('#world').attr('scrollHeight') })
}

var updateAliases = function(aliases) {
  $('#aliases ul').empty()

  for (alias in aliases) {
    var key   = alias
      , value = aliases[alias]

    $('#aliases ul').append(
      '<li>type <strong>' + key + '</strong> to <strong>' + value + '</strong></li>'
    )
  }
}

var updateTriggers = function(triggers) {
  $('#triggers ul').empty()

  for (trigger in triggers) {
    var key   = trigger
      , value = triggers[trigger]

    $('#triggers ul').append(
      '<li>when <strong>' + key + '</strong> then <strong>' + value + '</strong></li>'
    )
  }
}

var systemMessage = function(message) {
  $('#world').append("<span class='yellow'># " + message + "</span>\r\n")

  lockScroll()
}

var updateSelf = function(command) {
  $('#world').append("<span class='self'>> " + command + "</span>\r\n")
  
  lockScroll()
}

$(function() {
  var world  = new World('#world')
    , socket = new io.Socket('localhost', { port: 6660 })
  
  socket.connect()

  socket.on('connect', function() {
    $('input').focus()

    $('input').keyup(function(event) {
      if (event.keyCode == 13) {
        socket.send($('input').val())
        updateSelf($('input').val())
        
        $('input').val('')
      }
    })
  })

  socket.on('message', function(message) {
    var command = message.command
      , data    = message.data

    if (command == 'listAliases') {
      world.listAliases(data)
    } else if (command == 'listTriggers') {
      world.listTriggers(data)
    } else if (command == 'updateSelf') {
      updateSelf(data)
    } else if (command == 'updateWorld') {
      world.update(data)
    }
  })
})
