var my_inputDevice = new LeapMotionInputDevice();
var my_canvas = new Canvas(my_inputDevice);
//my_canvas.getWebGLCanvas().useRedCyanProjector();
my_canvas.setRoom("http://localhost/webapps/Senior_Project/Stemming-into-Tomorrow/data/rooms/default");
my_canvas.getWebGLCanvas().onDrag = function(event) {
	my_canvas.getWebGLCanvas().camera.oneFingerRotate(event);
}

var game = new Game(my_canvas, my_inputDevice);
