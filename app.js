var five = require("johnny-five");
var Particle = require("particle-io");
var keys = require("./keypackage/keys");
var board = new five.Board({
  io: new Particle({
    token: keys.getToken(),
    deviceId: keys.getDeviceName()
  })
});
console.log(keys.getDeviceName());



board.on("ready", function() {
  console.log('ready');

  var rightWheel = new five.Motor({
    pins: { pwm: "D0", dir: "D4" },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: { pwm: "D1", dir: "D5" },
    invertPWM: true
  });
 var Servo = new five.Servo({
    pin: "D2" ,
    type: "continuous"
  });

  var speed = 255;
  
  
  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left() {
    leftWheel.rev(speed);
    rightWheel.fwd(speed);
  }

  function right() {
    leftWheel.fwd(speed);
    rightWheel.rev(speed);
  }

  function exit() {
    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000);
  }
function speedUp(){
    speed += 10;
    Servo.ccw(1);
}

function slow(){
    speed -=10;
    Servo.cw(1);
}


  var keyMap = {
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit,
    'a': speedUp,
    's': slow
  };

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;      

      keyMap[key.name]();
  });
});