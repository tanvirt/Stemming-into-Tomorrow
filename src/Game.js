function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = canvas;

	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);
	
	this._selectedObject = null;
	
	this._server = new Server("Experiential Learning");
	this._server.addListener(this);
	
	this._setup();
}

Game.prototype.onConnectionOpened = function() {
	this._server.createAndJoinNewSession("Session 1", 2, false);
}

Game.prototype.onSelfJoinedSession = function() {
	this._server.createSessionVariable("game_score", 2);
	this._server.createSessionStream("buffer", new Uint8Array([2, 3, 4]));
}

Game.prototype.onSessionVariableChanged = function(variable, user) {
	console.log(variable);
}

Game.prototype.onSessionStreamChanged = function(stream, user) {
	console.log("session stream changed");
}

Game.prototype.onGesture = function(gesture) {
	var gestureType = gesture.type;
	if(gestureType == "pinch")
		this._onPinch(gesture);
	else if(gestureType == "circle")
		this._onCircle(gesture);
	else if(gestureType == "keyTap")
		this._onKeyTap(gesture);
	else if(gestureType == "screenTap")
		this._onScreenTap(gesture);
	else if(gestureType == "swipe")
		this._onSwipe(gesture);
}

Game.prototype._setup = function() {
	this._setCanvasRoom();
	this._addHandToCanvas();
	this._addAnswerCubesToCanvas();
	this._addAnswerAreaToCanvas();
	this._addTransformingSphereToCanvas();
	//this._addRocketToCanvas();
}

Game.prototype._addRocketToCanvas = function() {
	var rocket = new CompositeDrawable(this._canvas);
	rocket.loadOBJMTL('../data/obj/Rocket/', 'roket.mtl', 'roket.obj', '');
	//rocket.translate(-275, 0, -700);
	rocket.translate(-1400, 0, -700);
	rocket.rotate(0, Math.PI/2, 0);

	rocket.drawSetup = function() {
		this.translate(3, 0, 0);
		if(this.getPosition()[1] > 1400)
			this.removeFromCanvas();
	}

	rocket.addToCanvas();
}

Game.prototype._addTransformingSphereToCanvas = function() {
	var sphere = new TransformingSphere(this._canvas, "Which numbers are prime?");
	sphere.rotate(Math.PI/4, 0, 0);
	sphere.setPosition([0, 7.5, -5]);
	sphere.addToCanvas();
	sphere.transform();
}

Game.prototype._setCanvasRoom = function() {
	this._canvas.setHDRIRoom("../data/textures/hdri_stars.jpg");
}

Game.prototype._addAnswerCubesToCanvas = function() {
	this._addAnswerCubeToCanvas("13", [1.25, -0.75, -3]);
	this._addAnswerCubeToCanvas("4", [1.25, 0.75, -3]);
	this._addAnswerCubeToCanvas("1", [1.5, 0, -3]);

	this._addAnswerCubeToCanvas("14", [-1.25, -0.75, -3]);
	this._addAnswerCubeToCanvas("3", [-1.25, 0.75, -3]);
	this._addAnswerCubeToCanvas("8", [-1.5, 0, -3]);
}

Game.prototype._addAnswerCubeToCanvas = function(text, position) {
	var answerCube = new AnswerCube(this._canvas, text, 0.25);

	answerCube.disablePicking(false);
	answerCube.setPosition(position);
	
	octree_global.addMovingObject(answerCube);
	answerCube.addToCanvas();
}

Game.prototype._addAnswerAreaToCanvas = function() {
	var answerArea = new AnswerArea(this._canvas, 1.5, 1.5, 1.5);
	var answers = ["1", "2", "3", "5", "7", "11", "13"];
	answerArea.setCorrectAnswers(answers);
	answerArea.setPosition([0, 0, -3.5]);
	
	answerArea.addToCanvas();
}

Game.prototype._addHandToCanvas = function() {
	var hand = new Hand(this._canvas);
	hand.addToCanvas();
}

Game.prototype._createBlackText = function(string, height) {
	var text = new Text(this._canvas, string);
	text.setBackgroundColor("white");
	text.setTextColor("black");
	text.setTextHeight(height);
	text.enableSquareTexture();
	
	return text;
}

Game.prototype._createWhiteText = function(string, height) {
	var text = new Text(this._canvas, string);
	text.setBackgroundColor("black");
	text.setTextColor("white");
	text.setTextHeight(height);
	text.enableSquareTexture();
	
	return text;
}

// DEV: does not work when the canvas projector is changed
Game.prototype._onPinch = function(gesture) {
	var pinchCenter = gesture.position;
	if(gesture.state == "start") {
		var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
		this._selectedObject = this._canvas.getObjectAt(pixel[0], pixel[1]);
	}
	else if(gesture.state == "update" && this._selectedObject != null)
		this._selectedObject.setPosition(pinchCenter);
	else if(gesture.state == "stop")
		this._canvas.updatePickingMap();
}

Game.prototype._onCircle = function(gesture) {}
Game.prototype._onKeyTap = function(gesture) {
	console.log("onKeyTap: [" + gesture.position + "]");
}
Game.prototype._onScreenTap = function(gesture) {
	console.log("onScreenTap: [" + gesture.position +"]");
}
Game.prototype._onSwipe = function(gesture) {}
