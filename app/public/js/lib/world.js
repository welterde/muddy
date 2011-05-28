var World = function(selector) {
  this.selector = selector
  this.history  = []
  this.current  = 0
}

World.prototype.update = function(data) {
  $(this.selector).append(data)
  $(this.selector).attr({ scrollTop: $(this.selector).attr('scrollHeight') })
}

World.prototype.selfMesssage = function(message) {
  this.update("<span class='self'>" + message + "</span>\r\n")
}

World.prototype.systemMessage = function(message) {
  this.update("\r\n<span class='yellow'># " + message + "</span>\r\n")
}

World.prototype.updateHistory = function(command) {
  this.history.push(command)
  this.current = this.history.length
}

World.prototype.listAliases = function(aliases) {
  this.systemMessage('Your Aliases:\r\n')

  for (alias in aliases) {
    var key   = alias
      , value = aliases[alias]

    this.systemMessage('type `' + key + '` to `' + value + '`')
  }
}

World.prototype.listTriggers = function(triggers) {
  this.systemMessage('Your Triggers:\r\n')
  
  for (trigger in triggers) {
    var key   = trigger
      , value = triggers[trigger]

    this.systemMessage('type `' + key + '` to `' + value + '`')
  }
}
