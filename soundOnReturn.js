var DHCP_Module = require("DHCP-Broadcast-Callback");
var YamahaAPI = require("Yamaha-Network-API");

//var yamaha = new YamahaAPI("192.168.0.25");

//"90:72:40:6c:e1:bc"


/*
* config e.g.
{
	"yamaha_ip":"192.168.0.25",
	"mac_adresses":["90:72:40:6c:e1:bc"],
	"selectWebRadioFavoriteChannel": 1
}
*/
function SoundOnReturn(config) {

	config.ip = config.yamaha_ip;
	config.mac_adresses = config.mac_adresses;
	config.selectWebRadioFavoriteChannel = config.selectWebRadioFavoriteChannel || 1;

	if (config.selectWebRadioFavoriteChannel)  config.inputChannel = "NET RADIO";
	if (config.usbstick)  config.inputChannel = "USB";

	if(!config.inputChannel) {
		console.log("Choose favorite webradio channel or usbstick song");
		return;
	}

	var dhcp = new DHCP_Module(config.mac_adresses);
	var yamaha = new YamahaAPI(config.ip);

	dhcp.on("broadcast", function(macadress) {

		yamaha.isOn(function(isOn) {
			if (isOn) {
				console.log("Yamaha is already on, do nothing");
				return;
			}

			yamaha.powerOn().done(function() {
				console.log("poweredOn");
				ReceiverPoweredOn(yamaha, config);
			});

		});


	});


}

function ReceiverPoweredOn(yamaha, config) {
	yamaha.getCurrentInput().done(function(input) {

		if (input === config.inputChannel) {
			switchToSound(yamaha, config);
		} else {
			yamaha.setMainInputTo(config.inputChannel).done(function() {
				switchToSound(yamaha, config);
			});
		}

	});

}


function switchToSound(yamaha, config) {
	console.log("Switched to net radio");

	if (config.selectWebRadioFavoriteChannel) {
		yamaha.selectWebRadioListWithNumber(1).done(function() {
			console.log("Selected Favorites");
			yamaha.selectWebRadioListWithNumber(config.selectWebRadioFavoriteChannel).done(function() {});
		});
	}else if (config.usbstick){
		yamaha.selectUSBListWithNumber(config.usbstick).done(function() {});
	}
	
}


function delay(delayInS, callAfterDelay) {
	return function() {
		setTimeout(function() {
			callAfterDelay();
		}, delayInS * 1000);
	};
}


module.exports = SoundOnReturn;