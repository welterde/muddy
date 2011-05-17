# muddy

A MUD client in your browser usin' node.js & websockets.

This has only been tested with [Aardwolf](http://aardwolf.com),
so if you notice anything wrong in a different MUD let me know via
[Issues](http://github.com/dannytatom/muddy/issues).

![Fuck yeah!](http://f.cl.ly/items/2c3P0H1z1n472N0N1b21/Screen%20shot%202011-02-27%20at%204.47.03%20PM.png)

## Features

- Aliases
- Triggers

## Installation & Usage

### Installation

    $ git clone git://github.com/dannytatom/muddy.git
    $ cd muddy
    $ npm install
    $ vim config/config.json
    $ node app/init.js &
    $ open http://localhost:6660

### Aliases

    ;alias add {go home} {invoke stone} # Add an alias
    ;alias rm {go home}                 # Remove an alias
    ;alias ls                           # List aliases

### Triggers

    ;trigger add {Your Selection:} {1} # Add a trigger
    ;trigger rm {Your Selection:}      # Remove a trigger
    ;trigger ls                        # List triggers

## Copyright

Copyright (c) 2011 Danny Tatom. See LICENSE for details.
