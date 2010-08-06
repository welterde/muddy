# muddy

A mud client in your browser usin' node.js & websockets.

## Features

- ✓ Basic Communication w/ MUD server
- ✗ Uses ASCII encoding as explained [here](http://cryosphere.net/mud-protocol.html)
- ✗ Uses the MCCP as defined [here](http://mccp.smaugmuds.org/)
- ✗ Command history
- ✗ Aliases
- ✗ Triggers

## Installation & Usage

    $ npm install websocket-server
    $ npm install yaml
    $ git clone git://github.com/dannytatom/muddy.git
    $ cd muddy
    $ vim config.js
    $ node server.js &
    $ chromium client/index.html

## Copyright

Copyright (c) 2010 Danny Tatom. See LICENSE for details.
