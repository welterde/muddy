var World = function(selector) {
  this.selector = selector
}

World.prototype.systemMessage = function(message) {
  this.update("\r\n<span class='yellow'># " + message + "</span>\r\n")
}

World.prototype.listAliases = function(aliases) {
  systemMessage('\r\nYour Aliases:\r\n')

  for (alias in aliases) {
    var key   = alias
      , value = aliases[alias]

    systemMessage('type `' + key + '` to `' + value + '`')
  }
}

World.prototype.listTriggers = function(triggers) {
  this.systemMessage('Your Triggers:\r\n')
  
  for (trigger in triggers) {
    var key   = trigger
      , value = triggers[trigger]

    systemMessage('type `' + key + '` to `' + value + '`')
  }
}

World.prototype.update = function(data) {
  $(this.selector).append(data)
  $(this.selector).attr({
    scrollTop: $(this.selector).attr('scrollHeight')
  })
}
