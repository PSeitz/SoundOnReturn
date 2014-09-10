SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite
- [Install Nodejs](http://nodejs.org/)
- Execute `npm install` in the directory, to download dependencies

## Usage
##### Commandline-Usage

Edit the sor-conf.json file. If the mac_adresses entry is deleted, all devices will issue the command

```json
{
    "yamaha_ip":"YAMAHA-IP Adress",
	"mac_adresses":["FF:FF:FF:FF:FF:FF","AA:AA:AA:AA:AA:AA"]
}
```
Then start it with:
    
    node sor-starter.js

  

##### API Usage

    var SoundOnReturn = require('./SoundOnReturn.js');
    new SoundOnReturn({
      yamaha_ip:"192.168.0.100",
      mac_adresses:"FF:FF:FF:FF:FF:FF" // Whitelist of mac-adresses
    });
