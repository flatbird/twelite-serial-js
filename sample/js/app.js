window.addEventListener("load", function() {
  Main.init();
});

var Main = {
  init: function() {
    SocketSerial.init();
    SocketSerial.open();
    SocketSerial.ondata(this.ondata.bind(this));
    this.elDI1 = document.getElementById('di1');
    this.elDI2 = document.getElementById('di2');
    this.elDI3 = document.getElementById('di3');
    this.elDI4 = document.getElementById('di4');
  },
  ondata: function(line) {
    var data = TweLiteSerial.parseLine(line);
    var digitalOut = data.digital;
    console.log(digitalOut);
    this.elDI1.checked = (digitalOut[0] != 0);
    this.elDI2.checked = (digitalOut[1] != 0);
    this.elDI3.checked = (digitalOut[2] != 0);
    this.elDI4.checked = (digitalOut[3] != 0);
  }
}