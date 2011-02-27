var socket

var format = function(data) {
  return data.replace(/��/g,      '\n')
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
             .replace(/\[0;37;40m/g, "<span class='black-bg white'>")
             .replace(/\[1;37;40m/g, "<span class='black-bg white bold'>")
             .replace(/\[1m/g,    "<span class='bold'>")
             .replace(/\[3m/g,    "<span class='italic'>")
             .replace(/\[4m/g,    "<span class='underline'>")
             .replace(/\[22m/g,   "<span class='no-bold'>")
             .replace(/\[23m/g,   "<span class='no-italic'>")
             .replace(/\[24m/g,   "<span class='no-underline'>")
}

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
  if (data.type == 'trigger') {
    $('#output pre').append("<span class='self'>> " + data.data + "</span>\n")
  } else {
    $('#output pre').append(format(data))
  }

  lockScroll()
}


$(function() {
  $('input').focus()
  $('input').keyup(function(event) {
    if (event.keyCode == 13) {
      sendCommand($('input').val())
      
      $('input').val('')
    }
  })

  socket = new io.Socket('localhost', { port: 6660 })
  socket.connect()

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
