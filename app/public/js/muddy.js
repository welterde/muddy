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

  socket.on('message', function(data) {
    if (data.cmd == 'updateAliases') {
      updateAliases(data.aliases)
    } else if (data.cmd == 'updateTriggers') {
      updateTriggers(data.triggers)
    } else if (data.cmd == 'updateSelf') {
      updateSelf(data.command)
    } else if (data.cmd == 'updateTells') {
      updateTells(data.message)
    } else {
      updateWorld(data)
    }
  })
})
