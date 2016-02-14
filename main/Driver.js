var my_inputDevice = new LeapMotionInputDevice();
var my_canvas = new Canvas(my_inputDevice);
var host = Host.toString();
var room = "Senior_Project/Stemming-into-Tomorrow/data/rooms/default";
my_canvas.setRoom(host + room);

my_canvas.onDrag = function(event) {
	my_canvas.getCamera().oneFingerRotate(event);
}

var game = new Game(my_canvas, my_inputDevice);

document.body.onkeypress = function(event) {
	if(event.keyCode === 49)
		my_canvas.useRegularProjector();
	else if(event.keyCode === 50)
		my_canvas.useRedCyanProjector();
	else if(event.keyCode === 51)
		my_canvas.useOculusProjector();
	else if(event.keyCode === 52)
		my_canvas.useSideBySideProjector();
}

window.onorientationchange = function() {
	if(Mobile.isPhone() && Mobile.isLandscape())
		my_canvas.useOculusProjector();
	else
		my_canvas.useRegularProjector();
}
