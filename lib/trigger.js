var path = require('path')
  , fs   = require('fs')

var triggers

path.exists('config/triggers.js', function(exists) {
  if (exists) {
    triggers = JSON.parse(fs.readFileSync('config/triggers.js', 'utf8'))
  } else {
    fs.writeFileSync('config/triggers.js', '{}', 'utf8')
    triggers = JSON.parse(fs.readFileSync('config/triggers.js', 'utf8'))
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

  fs.writeFile('config/triggers.js', JSON.stringify(triggers), function(err) {
    if (err) {
    } else {
      callback()
    }
  })
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

  fs.writeFile('config/triggers.js', JSON.stringify(triggers), function(err) {
    if (err) {
    } else {
      callback()
    }
  })
}

exports.scan = function(data) {
  var commands = []

  for (var trigger in triggers) {
    if (data.match(trigger)) {
      commands.push(triggers[trigger] + '\n')
    }
  }

  return commands
}
