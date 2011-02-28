var socket

var lockScroll = function() {
  $('#world').attr({ scrollTop: $('#world').attr('scrollHeight') })
  $('#tells').attr({ scrollTop: $('#tells').attr('scrollHeight') })
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
  $('#world').append("<span class='self'>> " + command + "</span>\n")
  
  lockScroll()
}

var updateWorld = function(data) {
  $('#world').append(data)

  lockScroll()
}

var updateTells = function(data) {
  $('#tells').append(data)

  lockScroll()
}

var switchTabs = function(tab) {
  $('#tabs ul li a').removeClass('selected')
  $('#tabs ul li a.' + tab).addClass('selected')

  $('#client .output').hide()
  $('#client .output#' + tab).show()

  lockScroll()
}

$(function() {
  socket = new io.Socket('localhost', { port: 6660 })
  socket.connect()

  socket.on('connect', function() {
    $('input').focus()

    $('a.tells').click(function() { switchTabs('tells') })
    $('a.world').click(function() { switchTabs('world') })

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
