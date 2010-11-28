#muddy

A MUD client in your browser usin' node.js & websockets.

This has only been tested with [Primordiax](http://primordiax.com),
so if you notice anything wrong in a different MUD let me know via
[Issues](http://github.com/dannytatom/muddy/issues).

[Need a screenshot?](http://min.us/iB7lo.png)

## Features

- ✓ Command history
- ✓ Aliases
- ✓ Triggers

## TODO

- Speed it up
  - (I think the shitty triggers slow it down)
- Cleanup the format function
- Triggers should support regex

## Installation & Usage

muddy requires [Socket.IO](https://github.com/LearnBoost/Socket.IO-node)
& [js-yaml](https://github.com/visionmedia/js-yaml)

    $ npm install socket.io
    $ npm install yaml
    $ git clone git://github.com/dannytatom/muddy.git
    $ cd muddy
    $ vim config.js
    $ node init.js &
    $ chromium localhost:6660

### Aliases

    ;alias add {go home} {invoke stone} # Add an alias
    ;alias ls                           # Show all aliases
    ;alias rm {go home}                 # Remove an alias

### Triggers

    ;trigger add {Your Selection:} {1} # Add a trigger
    ;trigger ls                        # Show all triggers
    ;trigger rm {Your Selection:}      # Remove a trigger

## Copyright

Copyright (c) 2010 Danny Tatom. See LICENSE for details.
