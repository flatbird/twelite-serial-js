var SocketSerial = {
  init: function() {
    this.socket = null;
    this.address = '127.0.0.1';
    this.port = 9943;
    this.serialConfig = {
      devicename: 'ttyUSB0',
      bitrate: 115200
    };
  },
	open: function() {
    var socket = navigator.mozTCPSocket.open(this.address, this.port);
    this.socket = socket;
    var self = this;
    socket.onopen = function () {
      console.log('Opened');
      socket.send(JSON.stringify(self.serialConfig));
      if (self.onopen) {
        self.onopen();
      }
    }
    socket.ondata = function (evt) {
      if (typeof evt.data === 'string') {
        var line = evt.data;
        if (line[line.length-1] === '\n') {
          line = line.slice(0, line.length-1);
        }
        console.log(line);
        if (self.ondata) {
          self.ondata(line);
        }
      } else {
        console.error('Received a Uint8Array');
      }
    }
    socket.onerror = function (evt) {
      console.error('Error:' + evt.type);
      if (self.onerror) {
        self.onerror(evt);
      }
    }
  },
  send: function(data) {
    this.socket.send(data);
  },
  onopen: function(onopen) {
    this.onopen = onopen;
  },
  ondata: function(ondata) {
    this.ondata = ondata;
  },
  onerror: function(onerror) {
    this.onerror = onerror;
  }
};
/*
  function makeOutputValues(value) {
    var d1, d2, pwm;
    if (Math.abs(value) < 10) { // threshold
      d1 = d2 = 0; // free
      pwm = 0xFFFF; // not used
    } else if (value < 0) { // forward
      d1 = 0;
      d2 = 1;
      pwm = value * -11;
    } else { // reverse
      d1 = 1;
      d2 = 0;
      pwm = value * 11;
    }
    if (pwm > 1024) {
      pwm = 1024;
    }
    // reverse digital values (in twe-lite, HI=0, LO=1)
    d1 = d1 ? 0 : 1;
    d2 = d2 ? 0 : 1;
    return { 
      d1: d1,
      d2: d2,
      pwm: pwm
    };
  }
*/