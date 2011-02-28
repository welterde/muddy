# muddy

A MUD client in your browser usin' node.js & websockets.

This has only been tested with [Aardwolf](http://aardwolf.com),
so if you notice anything wrong in a different MUD let me know via
[Issues](http://github.com/dannytatom/muddy/issues).

![Fuck yeah!](http://f.cl.ly/items/2c3P0H1z1n472N0N1b21/Screen%20shot%202011-02-27%20at%204.47.03%20PM.png)

## Features

- Aliases
- Triggers
- Content types are organized via tabs
  - Currently only World & Tells

## TODO

- Error checking
- Tests

## Installation & Usage

### Installation

muddy requires [express](https://github.com/visionmedia/express)
, [Socket.IO](https://github.com/LearnBoost/Socket.IO-node)
& [js-yaml](https://github.com/visionmedia/js-yaml)

    $ npm install express
    $ npm install socket.io
    $ npm install yaml
    $ git clone git://github.com/dannytatom/muddy.git
    $ cd muddy
    $ vim config.js
    $ node init.js &
    $ open http://localhost:6660

### Aliases

    ;alias add {go home} {invoke stone} # Add an alias
    ;alias rm {go home}                 # Remove an alias

### Triggers

    ;trigger add {Your Selection:} {1} # Add a trigger
    ;trigger rm {Your Selection:}      # Remove a trigger

## Copyright

Copyright (c) 2011 Danny Tatom. See LICENSE for details.
