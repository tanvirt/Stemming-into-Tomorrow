function Driver() {
	var my_inputDevice = new LeapMotionInputDevice();
	var my_canvas = new Canvas(my_inputDevice);
	
	my_canvas.onDrag = function(event) {
		my_canvas.getCamera().oneFingerRotate(event);
	}
	
	var game = new Game(my_canvas, my_inputDevice);
	
	
	
	var tree = new OctalTree(4, 3, 12);
	
	var drawable = new DrawableObject(my_canvas);
	drawable.addBoundingBox(0.1, 0.1, 0.1);
	drawable.setPosition([0.25, 0.25, 0.25]);
	drawable._id = "drawable 1 -> [0.25, 0.25, 0.25]";
	
	var drawable2 = new DrawableObject(my_canvas);
	drawable2.addBoundingBox(0.1, 0.1, 0.1);
	drawable2.setPosition([0.45, 0.45, 0.45]);
	drawable2._id = "drawable 2 -> [0.45, 0.45, 0.45]";
	
	var drawable3 = new DrawableObject(my_canvas);
	drawable3.addBoundingBox(0.1, 0.1, 0.1);
	drawable3.setPosition([0.55, 0.55, 0.55]);
	drawable3._id = "drawable 3 -> [0.55, 0.55, 0.55]";
	
	var drawable4 = new DrawableObject(my_canvas);
	drawable4.addBoundingBox(0.1, 0.1, 0.1);
	drawable4.setPosition([0.65, 0.65, 0.65]);
	drawable4._id = "drawable 4 -> [0.65, 0.65, 0.65]";
	
	var drawable6 = new DrawableObject(my_canvas);
	drawable6.addBoundingBox(0.1, 0.1, 0.1);
	drawable6.setPosition([-0.45, 0.45, 0.45]);
	drawable6._id = "drawable 6 -> [-0.45, 0.45, 0.45]";
	
	var drawable7 = new DrawableObject(my_canvas);
	drawable7.addBoundingBox(0.1, 0.1, 0.1);
	drawable7.setPosition([0.45, -0.45, 0.45]);
	drawable7._id = "drawable 7 -> [0.45, -0.45, 0.45]";
	
	var drawable8 = new DrawableObject(my_canvas);
	drawable8.addBoundingBox(0.1, 0.1, 0.1);
	drawable8.setPosition([0.45, 0.45, -0.45]);
	drawable8._id = "drawable 8 -> [0.45, 0.45, -0.45]";
	
	var drawable9 = new DrawableObject(my_canvas);
	drawable9.addBoundingBox(0.1, 0.1, 0.1);
	drawable9.setPosition([0.45, 0.45, -0.45]);
	drawable9._id = "drawable 9 -> [0.45, 0.45, -0.45]";
	
	
	
	
	
	var drawable5 = new DrawableObject(my_canvas);
	drawable5.addBoundingBox(0.1, 0.1, 0.1);
	drawable5.setPosition([-1.125, -1.5, -4.5]);
	drawable5._id = "drawable 5 -> [-1.125, -1.5, -4.5]";
	
	var drawable10 = new DrawableObject(my_canvas);
	drawable10.addBoundingBox(0.1, 0.1, 0.1);
	drawable10.setPosition([-1.125, -1.5, -4.5]);
	drawable10._id = "drawable 10 -> [-1.125, -1.5, -4.5]";
	
	var drawable11 = new DrawableObject(my_canvas);
	drawable11.addBoundingBox(0.1, 0.1, 0.1);
	drawable11.setPosition([-1.125, -1.5, -4.5]);
	drawable11._id = "drawable 11 -> [-1.125, -1.5, -4.5]";
	
	var drawable12 = new DrawableObject(my_canvas);
	drawable12.addBoundingBox(0.1, 0.1, 0.1);
	drawable12.setPosition([-1.125, -1.5, -4.5]);
	drawable12._id = "drawable 12 -> [-1.125, -1.5, -4.5]";
	
	var drawable13 = new DrawableObject(my_canvas);
	drawable13.addBoundingBox(0.1, 0.1, 0.1);
	drawable13.setPosition([-0.375, -0.5, -1.5]);
	drawable13._id = "drawable 13 -> [-0.375, -0.5, -1.5]";
	
	var drawable14 = new DrawableObject(my_canvas);
	drawable14.addBoundingBox(0.1, 0.1, 0.1);
	drawable14.setPosition([-0.375, -0.5, -1.5]);
	drawable14._id = "drawable 14 -> [-0.375, -0.5, -1.5]";
	
	var drawable15 = new DrawableObject(my_canvas);
	drawable15.addBoundingBox(0.1, 0.1, 0.1);
	drawable15.setPosition([-0.375, -0.5, -1.5]);
	drawable15._id = "drawable 15 -> [-0.375, -0.5, -1.5]";
	
	var drawable16 = new DrawableObject(my_canvas);
	drawable16.addBoundingBox(0.1, 0.1, 0.1);
	drawable16.setPosition([-0.375, -0.5, -1.5]);
	drawable16._id = "drawable 16 -> [-0.375, -0.5, -1.5]";
	
	var drawable17 = new DrawableObject(my_canvas);
	drawable17.addBoundingBox(0.1, 0.1, 0.1);
	drawable17.setPosition([-1.125, -0.5, -4.5]);
	drawable17._id = "drawable 17 -> [-1.125, -0.5, -4.5]";
	
	
	
	var leaf = new Leaf(drawable);
	leaf._key = "leaf of 1 -> [0.25, 0.25, 0.25]";
	var leaf2 = new Leaf(drawable2);
	leaf2._key = "leaf of 2 -> [0.45, 0.45, 0.45]";
	var leaf3 = new Leaf(drawable3);
	leaf3._key = "leaf of 3 -> [0.55, 0.55, 0.55]";
	var leaf4 = new Leaf(drawable4);
	leaf4._key = "leaf of 4 -> [0.65, 0.65, 0.65]";
	var leaf6 = new Leaf(drawable6);
	leaf6._key = "leaf of 6 -> [-0.45, 0.45, 0.45]";
	var leaf7 = new Leaf(drawable7);
	leaf7._key = "leaf of 7 -> [0.45, -0.45, 0.45]";
	var leaf8 = new Leaf(drawable8);
	leaf8._key = "leaf of 8 -> [0.45, 0.45, -0.45]";
	var leaf9 = new Leaf(drawable9);
	leaf9._key = "leaf of 9 -> [0.45, 0.45, -0.45]";
	
	
	var leaf5 = new Leaf(drawable5);
	leaf5._key = "leaf of 5 -> [-1.125, -1.5, -4.5]";
	var leaf10 = new Leaf(drawable10);
	leaf10._key = "leaf of 10 -> [-1.125, -1.5, -4.5]";
	var leaf11 = new Leaf(drawable11);
	leaf11._key = "leaf of 11 -> [-1.125, -1.5, -4.5]";
	var leaf12 = new Leaf(drawable12);
	leaf12._key = "leaf of 12 -> [-1.125, -1.5, -4.5]";
	var leaf13 = new Leaf(drawable13);
	leaf13._key = "leaf of 13 -> [-0.375, -0.5, -1.5]";
	var leaf14 = new Leaf(drawable14);
	leaf14._key = "leaf of 14 -> [-0.375, -0.5, -1.5]";
	var leaf15 = new Leaf(drawable15);
	leaf15._key = "leaf of 15 -> [-0.375, -0.5, -1.5]";
	var leaf16 = new Leaf(drawable16);
	leaf16._key = "leaf of 16 -> [-0.375, -0.5, -1.5]";
	var leaf17 = new Leaf(drawable17);
	leaf17._key = "leaf of 17 -> [-1.125, -0.5, -4.5]";
	
	
	tree.insert(leaf);
	tree.insert(leaf2);
	tree.insert(leaf3);
	tree.insert(leaf4);
	tree.insert(leaf6);
	tree.insert(leaf7);
	tree.insert(leaf8);
	tree.insert(leaf9);
	
	
	tree.insert(leaf5);
	tree.insert(leaf10);
	tree.insert(leaf11);
	tree.insert(leaf12);
	tree.insert(leaf13);
	tree.insert(leaf14);
	tree.insert(leaf15);
	tree.insert(leaf16);
	tree.insert(leaf17);
	
	

	console.log(tree.getCollidee(leaf9.getBoundingBox()));
	
	console.log(leaf10);
	console.log(tree.getCollidee(leaf10.getBoundingBox()));
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
