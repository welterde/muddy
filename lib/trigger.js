var path = require('path')
  , fs   = require('fs')

var Trigger = module.exports = function(mud, client) {
  this.mud    = mud
  this.client = client
  var that    = this

  path.exists('config/triggers.js', function(exists) {
    if (exists) {
      that.triggers = JSON.parse(fs.readFileSync('config/triggers.js', 'utf8'))
    } else {
      fs.writeFileSync('config/triggers.js', '{}', 'utf8')
      that.triggers = JSON.parse(fs.readFileSync('config/triggers.js', 'utf8'))
    }
  })
}

Trigger.prototype.create = function(trigger) {
  var that = this

  var string = trigger.replace(';alias ', '')
    , array  = string.match(/\{(?:[^\\}]+|\\.)*}/g)
    , key    = array[0].replace('{', '').replace('}', '')
    , value  = array[1].replace('{', '').replace('}', '')

  this.triggers[key] = value

  fs.writeFile('config/triggers.js', JSON.stringify(this.triggers), function(err) {
    if (err) {
      that.client.send('Eh, something broke!\n\n')
    } else {
      that.client.send('Trigger saved: ' + key + ' -> ' + value + '\n\n')
    }
  })
}

Trigger.prototype.show = function() {
  for (var key in this.triggers) {
    this.client.send(key + ' -> ' + this.triggers[key] + '\n')
  }

  this.client.send('\n')
}

Trigger.prototype.remove = function(trigger) {
  var that = this

  var string  = trigger.replace(';trigger rm ', '')
    , array   = string.match(/\{(?:[^\\}]+|\\.)*}/g)
    , removed = []

  for (var i = 0; i < array.length; i++) {
    var trigger = array[i].replace('{', '').replace('}', '')

    if (this.triggers[trigger]) {
      delete this.triggers[trigger]
      removed.push(trigger)
    } else {
      that.client.send("Trigger '" + trigger + "' does not exist")
    }
  }

  fs.writeFile('config/triggers.js', JSON.stringify(this.triggers), function(err) {
    if (err) {
      that.client.send('Eh, something broke!\n\n')
    } else {
      that.client.send('Aliases removed: ' + removed.join(', ') + '\n\n')
    }
  })
}

Trigger.prototype.scan = function(data) {
  this.client.send(data)
  
  for (var key in this.triggers) {
    if (data.match(key)) {
      this.client.send({'type': 'trigger', 'data': this.triggers[key]})
      this.mud.write(this.triggers[key] + '\n')
    }
  }
}
