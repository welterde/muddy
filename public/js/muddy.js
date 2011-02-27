var socket

var lockScroll = function() {
  $('#output').attr({ scrollTop: $('#output').attr('scrollHeight') })
}

var sendCommand = function(command) {
  socket.send(command)

  updateSelf(command)

  lockScroll()
}

var updateSelf = function(command) {
  $('#output pre').append("<span class='self'>> " + command + "</span>\n")
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

var updateTerminal = function(data) {
  $('#output pre').append(data)

  lockScroll()
}


$(function() {
  socket = new io.Socket('localhost', { port: 6660 })
  socket.connect()

  socket.on('connect', function() {
    $('input').focus()

    $('input').keyup(function(event) {
      if (event.keyCode == 13) {
        sendCommand($('input').val())
        
        $('input').val('')
      }
    })
  })

  socket.on('message', function(data) {
    if (data.cmd == 'updateAliases') {
      updateAliases(data.aliases)
    } else if (data.cmd == 'updateTriggers') {
      updateTriggers(data.triggers)
    } else if (data.cmd == 'updateSelf') {
      updateSelf(data.command)
    } else {
      updateTerminal(data)
    }
  })
})
