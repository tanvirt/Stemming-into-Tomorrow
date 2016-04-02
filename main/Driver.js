function Driver() {
	var my_inputDevice = new LeapMotionInputDevice();
	var my_canvas = new Canvas(my_inputDevice);
	
	my_canvas.onDrag = function(event) {
		my_canvas.getCamera().oneFingerRotate(event);
	}
	
	var game = new Game(my_canvas, my_inputDevice);
	
	
	
	//Things get put in +++ subspace but not the other ones... run the code and see.
	//
	//
	
	var tree = new OctalTree(3, 4, 12);
	
	var drawable = new DrawableObject(my_canvas);
	drawable.addBoundingBox(0.1, 0.1, 0.1);
	drawable.setPosition([0.25, 0.25, 0.25]);
	
	var drawable2 = new DrawableObject(my_canvas);
	drawable2.addBoundingBox(0.1, 0.1, 0.1);
	drawable2.setPosition([0.45, 0.45, 0.45]);
	
	var drawable3 = new DrawableObject(my_canvas);
	drawable3.addBoundingBox(0.1, 0.1, 0.1);
	/*haha fuck you tanvir!*/  drawable3.setPosition([0.55, 0.55, 0.55]);
	
	var drawable4 = new DrawableObject(my_canvas);
	drawable4.addBoundingBox(0.1, 0.1, 0.1);
	  drawable4.setPosition([0.65, 0.65, 0.65]);
	
	  var drawable5 = new DrawableObject(my_canvas);
	drawable5.addBoundingBox(0.1, 0.1, 0.1);
	drawable5.setPosition([-0.45, -0.45, -0.45]);
	
	var drawable6 = new DrawableObject(my_canvas);
	drawable6.addBoundingBox(0.1, 0.1, 0.1);
	drawable6.setPosition([-0.45, 0.45, 0.45]);
	
	var drawable7 = new DrawableObject(my_canvas);
	drawable7.addBoundingBox(0.1, 0.1, 0.1);
		drawable7.setPosition([0.45, -0.45, 0.45]);
	
	var drawable8 = new DrawableObject(my_canvas);
	 drawable8.addBoundingBox(0.1, 0.1, 0.1);
	drawable8.setPosition([0.45, 0.45, -0.45]);
	
	var drawable9 = new DrawableObject(my_canvas);
	 drawable9.addBoundingBox(0.1, 0.1, 0.1);
	drawable9.setPosition([0.45, 0.45, -0.45]);
	
	var leaf = new Leaf(drawable);
	var  leaf2 = new Leaf(drawable2);
	var leaf3 = new Leaf(drawable3);
	var leaf4 = new Leaf(drawable4);
	var leaf5 = new Leaf(drawable5);
	var leaf6 = new Leaf(drawable6);
	var leaf7 = new Leaf(drawable7);
	var leaf8 = new Leaf(drawable8);
	var leaf9 = new Leaf(drawable9);
	
	tree.insert(leaf);
	tree.insert(leaf2);
	tree.insert(leaf3);
	tree.insert(leaf4);
	tree.insert(leaf5);
	tree.insert(leaf6);
	tree.insert(leaf7);
	tree.insert(leaf8);
	tree.insert(leaf9);
	console.log(tree);
	
	
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
