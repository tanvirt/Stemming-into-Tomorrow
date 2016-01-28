var inputDevice = new LeapMotionInputDevice();
var canvas = new Canvas("div_container", inputDevice);
var hand = new Hand(canvas);
hand.addToCanvas();
