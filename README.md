muddy

A MUD client in your browser usin' node.js & websockets.

This has only been tested with [Primordiax](http://primordiax.com),
so if you notice anything wrong in a different MUD let me know via
[Issues](http://github.com/dannytatom/muddy/issues).

[Need a screenshot?](http://min.us/iB7lo.png)

## Features

- ✗ Uses all ANSII color codes as listed [here](http://pueblo.sourceforge.net/doc/manual/ansi_color_codes.html)
- ✗ Uses the MCCP as defined [here](http://mccp.smaugmuds.org/)
- ✗ Command history
- ✓ Aliases
- ✗ Triggers

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

    ;alias add {go home} {rub stone} # Add an alias
    ;alias ls                        # Show all aliases
    ;alias rm {go home}              # Remove an alias

## Copyright

Copyright (c) 2010 Danny Tatom. See LICENSE for details.
