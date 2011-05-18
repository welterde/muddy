var path = require('path')
  , fs   = require('fs')

var triggers, file = 'config/triggers.json'

path.exists(file, function(exists) {
  if (exists) {
    triggers = JSON.parse(fs.readFileSync(file, 'utf8'))
  } else {
    fs.writeFileSync(file, '{}', 'utf8')
    triggers = JSON.parse(fs.readFileSync(file, 'utf8'))
  }
})

exports.list = function() {
  return triggers
}

exports.create = function(trigger, callback) {
  var string = trigger.replace(';trigger add', '')
    , array  = string.match(/\{(?:[^\\}]+|\\.)*}/g)
    , key    = array[0].replace('{', '').replace('}', '')
    , value  = array[1].replace('{', '').replace('}', '')

  triggers[key] = value

  fs.writeFile(file, JSON.stringify(triggers), function(err) {})
}

exports.remove = function(trigger, callback) {
  var string  = trigger.replace(';trigger rm ', '')
    , array   = string.match(/\{(?:[^\\}]+|\\.)*}/g)

  for (var i = 0; i < array.length; i++) {
    var trigger = array[i].replace('{', '').replace('}', '')

    if (triggers[trigger]) {
      delete triggers[trigger]
    }
  }

  fs.writeFile(file, JSON.stringify(triggers), function(err) {})
}

exports.scan = function(data) {
  var commands = []

  for (var trigger in triggers) {
    if (data.match(trigger)) {
      commands.push(triggers[trigger] + '\r\n')
    }
  }

  return commands
}
