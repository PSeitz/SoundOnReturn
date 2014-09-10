var DHCP_Module = require("DHCP-Broadcast-Callback");
var YamahaAPI = require("Yamaha-Network-API");

//var yamaha = new YamahaAPI("192.168.0.25");

//"90:72:40:6c:e1:bc"

function SoundOnReturn(config){
	
	this.ip = config.yamaha_ip;
	this.mac_adresses = config.mac_adresses;


	var dhcp = new DHCP_Module(this.mac_adresses);
	var yamaha = new YamahaAPI(this.ip);

	dhcp.on("broadcast", function(macadress){
		console.log(macadress);




		yamaha.isOn().done(function(isOn){
			if (isOn) {
				console.log("Yamaha is already on, do nothing"); 
				return;
			}
			console.log("Switching Receiver on"); 
			yamaha.powerOn().done(function(){

				yamaha.getCurrentInput().done(function(input){

					if (input === "NET RADIO") {
						yamaha.selectWebRadioListWithNumber(1).done(function(){
							console.log("Switched to Favorites");
							yamaha.selectWebRadioListWithNumber(1).done(function(){
							});
						});
					}else{
						yamaha.setMainInputTo("NET RADIO").done( function(){
							console.log("Switched to net radio");
							yamaha.selectWebRadioListWithNumber(1).done(function(){
								console.log("Switched to Favorites");
								yamaha.selectWebRadioListWithNumber(1).done(function(){
								});
							});
		
						});
					}

				
					
					
				});

				/*console.log("powerOn");
				yamaha.setMainInputTo("NET RADIO").done( function(){
					console.log("Switched to net radio");
					yamaha.selectWebRadioListWithNumber(1).done(function(){
						console.log("Switched to Favorites");
						yamaha.selectWebRadioListWithNumber(1).done(function(){
						});
					});

				});*/
			});

		});

		


	});


}




function delay(delayInS, callAfterDelay){
	return function(){
		setTimeout(function(){
			callAfterDelay();
		}, delayInS*1000);
	};
}


module.exports = SoundOnReturn;
