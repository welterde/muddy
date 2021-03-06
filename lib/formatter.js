var attributes = { 0:  'normal'
                 , 1:  'bold'
                 , 4:  'underline'
                 , 30: 'black'
                 , 31: 'red'
                 , 32: 'green'
                 , 33: 'yellow'
                 , 34: 'blue'
                 , 35: 'magenta'
                 , 36: 'cyan'
                 , 37: 'white' 
                 , 40: 'black-bg'
                 , 41: 'red-bg'
                 , 42: 'green-bg'
                 , 43: 'yellow-bg'
                 , 44: 'blue-bg'
                 , 45: 'magenta-bg'
                 , 46: 'cyan-bg'
                 , 47: 'white-bg' }

exports.go = function(data) {
  var matches = data.match(/\[((\d*);){0,2}(\d*)m/g)

  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i]
        , codes = match.replace('[', '').replace('m', '').split(';')

      for (var c = 0; c < codes.length; c++) {
        codes[c] = attributes[codes[c]]
      }

      data = data.replace(match, '<span class="' + codes.join(' ') + '">')
    }
  }

  // This is definitely a hack,
  // whatever it's trying to say is probably important.
  //
  // But since it comes back crazy characters,
  // I have no idea. :(
  data = data.replace(/��/g, '')

  return data
}
