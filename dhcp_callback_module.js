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
        if (catchMacAdress.indexOf(mac) >= 0 ) {
            self.emit("broadcast", mac);
        }        
    });

    server.on('listening', function() {
        console.log('lizening');
    });

    server.bind(67, undefined, function() { 
        server.setBroadcast(true);
    });


    // events.EventEmitter.call(this);

    // var self = this;

    // var server = dhcpjs.createServer();
    // server.on('message', function(m) {
    //     console.log("BROADCAST");
    //     if (m && m.chaddr) {
            // if (catchMacAdress.indexOf(m.chaddr.address) >= 0 ) {
            //     self.emit("broadcast", m.chaddr.address);
            // }
    //     }

    //     console.log(m.chaddr.address);
    // });



    // server.on('listening', function(address) {
    //     console.log('listening on ' + address);
    // });

    // server.bind();

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