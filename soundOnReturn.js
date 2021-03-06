var DHCP_Module = require("DHCP-Broadcast-Callback");
var YamahaAPI = require("Yamaha-Network-API");
var async = require("async");
//var yamaha = new YamahaAPI("192.168.0.25");

//"90:72:40:6c:e1:bc"


/*
* config e.g.
{
	"ip":"192.168.0.25",
	"mac_adresses":["90:72:40:6c:e1:bc"],
	"selectWebRadioFavoriteChannel": 1,
	"activationHours": 13-23

	or
	selectSongNumberFromUsb: 1
}
*/
function SoundOnReturn(config) {

	if (!config.ip) {
		console.log("Error: No ip adress for receiver provided");
		return;
	}

	config.ip = config.ip;
	config.mac_adresses = config.mac_adresses;
	config.selectWebRadioFavoriteChannel = config.selectWebRadioFavoriteChannel;

	if (config.selectWebRadioFavoriteChannel)  config.inputChannel = "NET RADIO";
	if (config.selectSongNumberFromUsb)  config.inputChannel = "USB";

	if(!config.inputChannel) {
		console.log("Choose favorite webradio channel or selectSongNumberFromUsb song");
		return;
	}

	var dhcp = new DHCP_Module({catchMacAdress:config.mac_adresses});
	var yamaha = new YamahaAPI(config.ip, config.delay);

	dhcp.on("broadcast", function(macadress) {
		console.log("Broadcast From:"+macadress);

		var date = new Date();
		var hour = date.getHours();

		if (config.activationHours) {
			var times = config.activationHours.split("-");
			if( hour >= parseInt(times[0]) && hour < parseInt(times[1])){
				console.log("Not in activation hour");
				return;
			}
		}

		yamaha.isOn().done(function(isOn) {
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

		if (config.volume) {
			yamaha.setVolumeTo(config.volume).done(function() {});
		}

	});

}


function switchToSound(yamaha, config) {
	if (config.selectWebRadioFavoriteChannel) {

		// async.series([
		//     function(callback){
		//         yamaha.selectWebRadioListItem(1).done(callback);  
		//     },
		//     function(callback){
		//         yamaha.whenMenuReady().done(callback);
		//     },
		//     function(callback){
		//         yamaha.selectWebRadioListItem().done(callback);
		//     }
		// ]);


		yamaha.selectWebRadioListItem(1).done(function() {
			console.log("Selected Favorites");
			yamaha.whenMenuReady().done(function(){
				yamaha.selectWebRadioListItem(config.selectWebRadioFavoriteChannel).done(function() {});
			});
		});
	}else if (config.selectSongNumberFromUsb){
		yamaha.selectUSBListItem(config.selectSongNumberFromUsb).done(function() {});
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