SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite
- [Install Nodejs](http://nodejs.org/)
- Execute ´npm install´ in the directory, to download dependencies

## Commandline-Usage

Edit the sor-conf.json file and enter you yamaha ip and a whitelist of mac adresses (format: "FF:FF:FF:FF:FF:FF")

```json
{
    "yamaha_ip":"YAMAHA-IP Adress",
	"mac_adresses":["FF:FF:FF:FF:FF:FF"]
}
```
    

    node sor-starter.js
Or use something like forever, to spwan process in background
    forever start sor-starter
  

## API Usage

    var SoundOnReturn = require('./SoundOnReturn.js');
    new SoundOnReturn({
      yamaha_ip:"192.168.0.100",
      mac_adresses:"FF:FF:FF:FF:FF:FF" // Whitelist of mac-adresses
    });
