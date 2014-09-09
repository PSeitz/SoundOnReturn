SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite
- [Install Nodejs](http://nodejs.org/)
- Execute ´npm install´ in the directory, to download dependencies

## Usage

##### Commandline

Edit the sor-conf.json file and enter you yamaha ip and a whitelist of mac adresses (format: "FF:FF:FF:FF:FF:FF")

    node sor-starter.js
    or
    forever start sor-starter
  

##### API Usage

    var SoundOnReturn = require('./SoundOnReturn.js');
    new SoundOnReturn({
      yamaha_ip:"192.168.0.100",
      mac_adresses:"FF:FF:FF:FF:FF:FF" // Whitelist of mac-adresses
    });
