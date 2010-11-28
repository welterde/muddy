var window_focused = true
  , cmdHistory = []
  , curHistory
  , socket

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

var setTerminalSize = function() {
  var wWidth  = window.innerWidth
    , wHeight = window.innerHeight

  $('#container').css('width',  (wWidth - 20))
  $('#container').css('height', (wHeight - 20))
  $('#output').css('height', (wHeight - 50))
}

var sendCommand = function(command) {
  socket.send(command)

  $('#output pre').append("<span class='self'>> " + command + "</span>\n")

  if (command != '') {
    cmdHistory.push(command)
    curHistory = (cmdHistory.length - 1)
  }

  lockScroll()
}

var updateTerminal = function(data) {
  if (data.type == 'trigger') {
    $('#output pre').append("<span class='self'>> " + data.data + "</span>\n")
  } else {
    $('#output pre').append(format(data))
  }

  if (!window_focused) {
    document.title = 'muddy *'
  }

  lockScroll()
}

var lockScroll = function() {
  $('#output').attr({ scrollTop: $('#output').attr('scrollHeight') })
}

var initialize = function() {
  setTerminalSize()
  window.onblur  = function() { window_focused = false }
  window.onfocus = function() { window_focused = true  }
 
  $(window).focus(function() {
    document.title = 'muddy'
  })

  $(window).resize(function() {
    setTerminalSize()
  })

  $('#input input').focus()
  $('#input input').keyup(function(event) {
    if (event.keyCode == 13) {
      var command = $('#input input').val()

      sendCommand(command)
      $('#input input').val('')
    } else if (event.keyCode == 38) {
      if (curHistory >= 0) {
        $('#input input').val(cmdHistory[curHistory])
        curHistory -= 1
      }
    } else if (event.keyCode == 40) {
      if (curHistory <= (cmdHistory.length - 1)) {
        curHistory += 1
        $('#input input').val(cmdHistory[curHistory])
      }
    }
  })

  socket = new io.Socket('localhost')
  socket.connect()

  socket.on('message', function(data) {
    updateTerminal(data)
  })
}

$(function() {
  initialize()
})
