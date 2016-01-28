var inputDevice = new LeapMotionInputDevice();
var canvas = new Canvas(inputDevice);
var hand = new Hand(canvas);
hand.addToCanvas();