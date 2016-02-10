var my_inputDevice = new LeapMotionInputDevice();
var my_canvas = new Canvas(my_inputDevice);
my_canvas.useRedCyanProjector();
my_canvas.setRoom("http://localhost:8888/Senior_Project/Stemming-into-Tomorrow/data/rooms/default");
my_canvas.onDrag = function(event) {
	my_canvas.getCamera().oneFingerRotate(event);
}

var game = new Game(my_canvas, my_inputDevice);
