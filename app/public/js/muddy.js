var socket

var lockScroll = function() {
  $('#world').attr({ scrollTop: $('#world').attr('scrollHeight') })
}

var sendCommand = function(command) {
  socket.send(command)
  updateSelf(command)
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

var listAliases = function(aliases) {
  for (alias in aliases) {
    var key   = alias
      , value = aliases[alias]

    systemMessage('type ' + key + ' to ' + value)
  }
}

var listTriggers = function(triggers) {
  for (trigger in triggers) {
    var key   = trigger
      , value = triggers[trigger]

    systemMessage('type ' + key + ' to ' + value)
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

var updateWorld = function(data) {
  $('#world').append(data)

  if ($('#world').is(':hidden')) {
    var span  = $('#tabs ul li a.world span')
      , count = parseInt(span.text() || 0)

    span.text(count += 1)
  }

  lockScroll()
}

$(function() {
  socket = new io.Socket('localhost', { port: 6660 })
  socket.connect()

  socket.on('connect', function() {
    $('input').focus()

    $('#client').click(function() { $('input').focus()  })

    $('input').keyup(function(event) {
      if (event.keyCode == 13) {
        var command = $('input').val()

        if (command == ';clear') {
          $('#world').empty()
        } else {
          sendCommand(command)
        }
        
        $('input').val('')
      }
    })
  })

  socket.on('message', function(message) {
    var command = message.command
      , data    = message.data

    if (command == 'updateAliases') {
      updateAliases(data)
    } else if (command == 'listAliases') {
      listAliases(data)
    } else if (command == 'updateTriggers') {
      updateTriggers(data)
    } else if (command == 'listTriggers') {
      listTriggers(data)
    } else if (command == 'updateSelf') {
      updateSelf(data)
    } else if (command == 'updateWorld') {
      updateWorld(data)
    }
  })
})
