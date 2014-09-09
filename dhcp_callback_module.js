var events = require("events");
var dhcpjs = require('dhcpjs');

function Service(catchMacAdress) {
    var self = this;

    var dgram = require('dgram');
    function readAddressRaw(msg, offset, len) {
            var addr = '';
            while (len-- > 0) {
                var b = msg.readUInt8(offset++);
                addr += (b + 0x100).toString(16).substr(-2);
                if (len > 0) {
                    addr += ':';
                }
            }
            return addr;
        }

    var server = dgram.createSocket('udp4');

    server.on('message', function(msg, rinfo) {
        var mac =  readAddressRaw(msg, 28, msg.readUInt8(2));
        console.log(mac);
        if (!catchMacAdress || catchMacAdress.indexOf(mac) >= 0 ) {
            self.emit("broadcast", mac);
        }        
    });

    server.on('listening', function() {
        console.log('lizening');
    });

    server.bind(67, undefined, function() { 
        server.setBroadcast(true);
    });


}

// inherit events.EventEmitter
Service.super_ = events.EventEmitter;
Service.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: Service,
        enumerable: false
    }
});




module.exports = Service;
