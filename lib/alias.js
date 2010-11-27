var path = require('path')
  , fs   = require('fs')

var Alias = module.exports = function(client) {
  this.client  = client
  this.aliases = {}

  path.exists('config/aliases.js', function(exists) {
    if (!exists) {
      fs.writeFileSync('config/aliases.js', '{}', 'utf8')
    }

    this.aliases = JSON.parse(fs.readFileSync('config/aliases.js', 'utf8'))
  })
}

Alias.prototype.create = function(data) {
  var that = this

  var string = data.replace(';alias ', '')
    , array  = string.match(/\{(?:[^\\}]+|\\.)*}/g)
    , key    = array[0].replace('{', '').replace('}', '')
    , value  = array[1].replace('{', '').replace('}', '')

  this.aliases[key] = value
  
  fs.writeFile('config/aliases.js', JSON.stringify(this.aliases), function(err) {
    if (err) {
      that.client.send('Eh, something broke!\n\n')
    } else {
      that.client.send('Alias saved: ' + key + ' -> ' + value + '\n\n')
    }
  })
}

Alias.prototype.show = function() {
  for (var key in this.aliases) {
    this.client.send(key + ' -> ' + this.aliases[key] + '\n')
  }

  this.client.send('\n')
}

Alias.prototype.format = function(data) {
  for (var key in this.aliases) {
    var data = data.replace(key, this.aliases[key])
  }

  return data + '\n'
}
