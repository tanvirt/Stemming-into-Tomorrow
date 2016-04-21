function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;

	this._gameScore = 0;
	
	this._canvas = canvas;
	
	this._connectionSyncNum = 0;

	this._scoreGraphic = this._createAnswerCube(0, [-1.7, 0.9, -3]);
	this._scoreGraphic.addToCanvas();
	this._scoreGraphic.setAnimation(new Animation(this._scoreGraphic, function(scoreGraphic) {
		scoreGraphic.rotate(0.01, 0.01, 0.01);
	}));
	//this._scoreGraphic.getShader().setLightingDirection([1, -1, 1]);
	this._scoreGraphic.disableShading();
	this._scoreGraphic.setColorMask([1, 0.9, 0.3, 1]);
	
	
	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);

	this._selectedObject = null;
	
	this._pinching = false;

	this._resources = new AssociativeArray();
	
	this._loadResources();
	this._setup();
	
	this._server = new Server("Experiential Learning");
	this._server.addListener(this);	
	
}

Game.prototype.correctAnswerRemovedFromBin = function() {
	this._gameScore -= 1;
	this._server.setSessionVariable("game_score", this._gameScore);
}

Game.prototype.update = function() {
	this._gameScore += 1;
	this._server.setSessionVariable("game_score", this._gameScore);
}

Game.prototype.onConnectionOpened = function() {
	this._server.joinFirstAvailableSession(2, true);
}

Game.prototype.onSelfJoinedSession = function(session) {
	if(!this._server.sessionVariableExists("game_score")) {
		console.log("creating session variable");
		this._initServerGraphics();
		this._server.createSessionVariable("game_score", this._gameScore);
	}
}

Game.prototype.onSessionVariableChanged = function(variable, user) {
	if(variable.name == "game_score") {
		if(this._previousServerEditedObject == variable.name) {
			console.log("HERRRRRREEE");
		}
		else {
			this._setGameScore(variable.value());
			console.log(variable);
			console.log(this._gameScore);
		}
	}
	else if(this._selectedObject != null && variable.name == this._selectedObject.getId()) {
		//this._resetSelectedObjectMask(this._selectedObject);
	}
	else if(this._resources.containsKey(variable.name)) {
		console.log("Somebody is moving some stuff");
		var drawableInQuestion = this._resources.get(variable.name);
		if(this._resources.get("answerArea").contains(drawableInQuestion)) {
			drawableInQuestion.updateWithoutColorMask(variable.value());
		}
		else if(this._objectHasChanged(variable)) {
			this._resources.get(variable.name).update(variable.value());		}
	}
}

Game.prototype._objectHasChanged = function(VNvariable) {
	return this._resources.get(VNvariable.name).hasChanged(VNvariable.value());
}

Game.prototype._alertServer = function() {
	//this._selectedObject.setColorMask([1,1,1,1]);
	this._server.setSessionVariable(this._selectedObject.getId(), this._selectedObject.getPosition().toString());
}


Game.prototype._setGameScore = function(stringValue) {
	this._gameScore = parseInt(stringValue);
	this._scoreGraphic.setText(stringValue);
}

Game.prototype.onSessionStreamChanged = function(stream, user) {
	// TODO
}

Game.prototype._initServerGraphics = function() {
	console.log(this._resources.get("answerCube13").getPosition().toString());
	this._server.createSessionVariable("answerCube13", this._resources.get("answerCube13").getPosition().toString());
	this._server.createSessionVariable("answerCube4", this._resources.get("answerCube4").getPosition().toString());
	this._server.createSessionVariable("answerCube1", this._resources.get("answerCube1").getPosition().toString());
	this._server.createSessionVariable("answerCube14", this._resources.get("answerCube14").getPosition().toString());
	this._server.createSessionVariable("answerCube3", this._resources.get("answerCube3").getPosition().toString());
	this._server.createSessionVariable("answerCube8", this._resources.get("answerCube8").getPosition().toString());
}

Game.prototype._loadResources = function() {
	this._resources.put("hand", this._createHand());

	this._resources.put("rocket", this._createRocket());
	
	this._resources.put("answerCube13", this._createAnswerCube("13", [-1, 0, -3]));
	this._resources.put("answerCube4", this._createAnswerCube("4", [-1, 0.5, -3]));
	this._resources.put("answerCube1", this._createAnswerCube("1", [-1, -0.5, -3]));
	this._resources.put("answerCube14", this._createAnswerCube("14", [-0.5, 0, -3]));
	this._resources.put("answerCube3", this._createAnswerCube("3", [-0.5, 0.5, -3]));
	this._resources.put("answerCube8", this._createAnswerCube("8", [-0.5, -0.5, -3]));
	
	this._resources.put("answerArea", this._createAnswerArea([1.175, 0, -3.5]));

	this._resources.put("question", this._createTransformingSphere());
	
	this._resources.get("answerCube13").setId("answerCube13");
	this._resources.get("answerCube4").setId("answerCube4");
	this._resources.get("answerCube1").setId("answerCube1");
	this._resources.get("answerCube14").setId("answerCube14");
	this._resources.get("answerCube3").setId("answerCube3");
	this._resources.get("answerCube8").setId("answerCube8");
}


Game.prototype._setup = function() {
	this._setCanvasRoom();
	this._addHandToCanvas();
	this._addAnswerCubesToCanvas();
	this._addAnswerAreaToCanvas();
	this._addTransformingSphereToCanvas();
	//this._addRocketToCanvas();
}

Game.prototype.makeTimedGame = function() {
	this._addRocketToCanvas();
}

Game.prototype._setCanvasRoom = function() {
	this._canvas.setHDRIRoom("../data/textures/hdri_stars.jpg");
}

Game.prototype._addRocketToCanvas = function() {
	var rocket = this._resources.get("rocket");
	rocket.addToCanvas();
}

Game.prototype._addTransformingSphereToCanvas = function() {
	var question = this._resources.get("question");
	question.addToCanvas();
	question.transform();
}

Game.prototype._addAnswerCubesToCanvas = function() {
	this._addAnswerCubeToCanvas("13");
	this._addAnswerCubeToCanvas("4");
	this._addAnswerCubeToCanvas("1");
	this._addAnswerCubeToCanvas("14");
	this._addAnswerCubeToCanvas("3");
	this._addAnswerCubeToCanvas("8");
}

Game.prototype._addAnswerCubeToCanvas = function(text) {
	var answerCube = this._resources.get("answerCube" + text);
	
	octree_global.addMovingObject(answerCube);
	answerCube.addToCanvas();
}

Game.prototype._addAnswerAreaToCanvas = function() {
	var answerArea = this._resources.get("answerArea");
	answerArea.addToCanvas();
	answerArea.addListener(this);
}

Game.prototype._addHandToCanvas = function() {
	var hand = this._resources.get("hand");
	hand.addToCanvas();
}

Game.prototype._createTransformingSphere = function() {
	var sphere = new TransformingSphere(this._canvas, "Which numbers are prime?");
	sphere.rotate(Math.PI/4, 0, 0);
	sphere.setPosition([0, 7.5, -5]);

	return sphere;
}

Game.prototype._createRocket = function() {
	var rocket = new CompositeDrawable(this._canvas);
	rocket.loadOBJMTL('../data/obj/Rocket/', 'roket.mtl', 'roket.obj', '');
	//rocket.translate(-275, 0, -700);
	rocket.translate(-1400, 0, -700);
	rocket.rotate(0, Math.PI/2, 0);

	rocket.setAnimation(new Animation(rocket, this._createRocketAnimateFunction()));

	return rocket;
}

Game.prototype._createRocketAnimateFunction = function() {
	var self = this;
	var startTime;
	var fade = function(drawableObject) {
		var currentTime = new Date().getTime();
		var elapsedTime = currentTime - startTime;
		if(elapsedTime < 3000)
			drawableObject.setColorMask([1,1,1,1 - elapsedTime/3000]);
		else
			drawableObject._canvas.clearDrawables();
	}

	return function(rocket) {
		rocket.translate(3, 0, 0);
		if(rocket.getPosition()[0] > 19000) {
			rocket.removeFromCanvas();
			startTime = new Date().getTime();
			var drawables = self._resources.values();
			for(var i = 0; i < drawables.length; i++) {
				var drawable = drawables[i];
				drawable.setAnimation(new Animation(drawable, fade));
			}
		}
	}
}

Game.prototype._createAnswerCube = function(text, position) {
	var answerCube = new AnswerCube(this._canvas, text, 0.25);

	answerCube.disablePicking(false);
	answerCube.setPosition(position);

	return answerCube;
}

Game.prototype._createAnswerArea = function(position) {
	var answerArea = new AnswerArea(this._canvas, 1.5, 1.5, 1.5);
	var answers = ["1", "2", "3", "5", "7", "11", "13"];
	answerArea.setCorrectAnswers(answers);
	answerArea.setPosition(position);

	return answerArea;
}

Game.prototype._createHand = function() {
	return new Hand(this._canvas);
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

// DEV: does not work when the canvas projector is changed
Game.prototype._onPinch = function(gesture) {
	var pinchCenter = gesture.position;
	this._pinching = true;
	if(gesture.state == "start") {
		var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
		this._selectedObject = this._canvas.getObjectAt(pixel[0], pixel[1]);
		//console.log(this._selectedObject);
	}
	else if(gesture.state == "update" && this._selectedObject != null) {
		this._selectedObject.setPosition(pinchCenter);
		this._alertServer();
		//console.log(this._selectedObject);
	}
	else if(gesture.state == "stop") {
		this._canvas.updatePickingMap();
//		if(this._selectedObject != null)
//			this._resetSelectedObjectMask(this._selectedObject);
		//this._flushColorMask();
		this._pinching = false;
		this._clearSelectedObject();
	}
	
}

Game.prototype._flushColorMask = function() {

	this._resources.get("answerCube13").setColorMask([1,1,1,1]);
	this._resources.get("answerCube4").setColorMask([1,1,1,1]);
	this._resources.get("answerCube1").setColorMask([1,1,1,1]);
	this._resources.get("answerCube14").setColorMask([1,1,1,1]);
	this._resources.get("answerCube3").setColorMask([1,1,1,1]);
	this._resources.get("answerCube8").setColorMask([1,1,1,1]);
}

Game.prototype._clearSelectedObject = function() {
	this._selectedObject = null;
}

Game.prototype._onCircle = function(gesture) {}
Game.prototype._onKeyTap = function(gesture) {
	console.log("onKeyTap: [" + gesture.position + "]");
	if(gesture.state == "stop") {
		if(this._canvas.current_projector == this._canvas.projectors[0]) {
			this._canvas.useRedCyanProjector();
		}
		else if(this._canvas.current_projector == this._canvas.projectors[1]) {
			this._canvas.useRegularProjector();
		}
		else if(this._canvas.current_projector == this._canvas.projectors[3]) {
			this._canvas.useOculusProjector();
		}
	}
}
Game.prototype._onScreenTap = function(gesture) {
	console.log("onScreenTap: [" + gesture.position +"]");
}
Game.prototype._onSwipe = function(gesture) {}
