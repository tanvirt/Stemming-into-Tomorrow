var inputDevice = new LeapMotionInputDevice();
var canvas = new Canvas(inputDevice);
//canvas.getWebGLCanvas().useRedCyanProjector();
canvas.setRoom("http://localhost/webapps/Senior_Project/Stemming-into-Tomorrow/default_room");
canvas.getWebGLCanvas().onDrag = function(event) {
	canvas.getWebGLCanvas().camera.oneFingerRotate(event);
}
var hand = new Hand(canvas);
hand.addToCanvas();

var game = new Game(canvas, inputDevice);
