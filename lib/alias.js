var fs = require('fs')

var Alias = module.exports = function(client) {
  this.client  = client
  this.aliases = JSON.parse(fs.readFileSync('config/aliases.js', 'utf8'))
}

Alias.prototype.isAlias = function(data) {
  if (this.aliases[data]) {
    return true
  } else {
    return false
  }
}

Alias.prototype.create = function(data) {
  var string = data.replace(';alias ', '')
    , array  = string.match(/\{(?:[^\\}]+|\\.)*}/g)
    , key    = array[0].replace('{', '').replace('}', '')
    , value  = array[1].replace('{', '').replace('}', '')

  this.aliases[key] = value
  fs.writeFileSync('config/aliases.js', JSON.stringify(this.aliases), 'utf8')
}

Alias.prototype.show = function() {
  for (var key in this.aliases) {
    this.client.send(key + ' -> ' + this.aliases[key] + '\n')
  }
  this.client.send('\n')
}
