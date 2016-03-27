function Driver() {
	var my_inputDevice = new LeapMotionInputDevice();
	var my_canvas = new Canvas(my_inputDevice);
	
	my_canvas.onDrag = function(event) {
		my_canvas.getCamera().oneFingerRotate(event, {radius : 2});
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
	var variables = ["gameScore", "HandPoints", "Gestures"];
	var server = new Server(variables, this, "MyUserName");
} 


Driver.prototype.acceptnotification = function(server) {
	server.modifyVariable("gameScore", 5);
}

var driver = new Driver();
//var interval = server.setVariable("gameScore");
//var gameScore = server.getVariable("gameScore");
//server.initServer();
//server.modifyGameScore(10);

//var server = new VNServer();
//
//server.onConnectionOpened = function() {
//	server.joinFirstAvailableSession(0, false);
//};
//
//server.onSelfJoinedSession = function(session) {
//	var message = server.currentSession.variable("message");
//	
//	message.onValueChanged = function(message, user) {
//		if(user.Id == server.me().Id)
//			console.log("me: " + message.value());
//		else console.log("other: " + message.value());
//	};
//	
//	document.body.onclick = function(event) {
//		message.set(CanvasMath.generateUniqueString(10));
//	}
//};
//
//server.connect("Experiential Learning");
