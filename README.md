SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite
- [Install Nodejs](http://nodejs.org/)
- Execute `npm install` in the directory, to download dependencies

## Available Options

- ip 
- mac_adresses
- volume
- selectSongNumberFromUsb
- selectWebRadioFavoriteChannel


## Usage
##### Start From The CommandLine

Create a config file conf.json with selected options. Then start it with:
    
    node sor-starter.js -c /path/to/file

```json
{
    "ip":"Yamaha Ip-Adress",
	"mac_adresses":["FF:FF:FF:FF:FF:FF","AA:AA:AA:AA:AA:AA"],
	"selectWebRadioFavoriteChannel":1
}
```


  

##### Usage From Other Node Modules

    var SoundOnReturn = require('./SoundOnReturn.js');
    new SoundOnReturn({
      yamaha_ip:"192.168.0.100",
      mac_adresses:"FF:FF:FF:FF:FF:FF" // Whitelist of mac-adresses
    });
