var socket

var setTerminalSize = function() {
  var wWidth  = window.innerWidth
    , wHeight = window.innerHeight;

  $('#container').css('width',  (wWidth - 20));
  $('#container').css('height', (wHeight - 20));
  $('#output').css('height', (wHeight - 50));
}

var sendCommand = function(command) {
  socket.send(command)

  $('#output pre').append("<span class='self'>> " + command + "</span>\n")

  lockScroll();
}

var updateTerminal = function(data) {
  $('#output pre').append(data);

  lockScroll();
}

var lockScroll = function() {
  $('#output').attr({ scrollTop: $('#output').attr('scrollHeight') });
}

var initialize = function() {
  setTerminalSize();

  $(window).resize(function() {
    setTerminalSize();
  });

  $('#input input').focus();

  $('#input input').keyup(function(event) {
    if (event.keyCode == 13) {
      var command = $('#input input').val()

      sendCommand(command);
      $('#input input').val('');
    }
  });

  socket = new io.Socket('localhost');
  socket.connect();

  socket.on('message', function(data) {
    updateTerminal(data);
  });
}

$(function() {
  initialize()
});
