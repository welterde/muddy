var path = require('path')
  , fs   = require('fs')

var settings, file = 'config/settings.json'

path.exists(file, function(exists) {
  if (exists) {
    settings = JSON.parse(fs.readFileSync(file, 'utf8'))
  } else {
    fs.writeFileSync(file, '{}', 'utf8')
    settings = JSON.parse(fs.readFileSync(file, 'utf8'))
  }
})

exports = settings
