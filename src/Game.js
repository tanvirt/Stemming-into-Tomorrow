// Implements the GestureListener interface.
function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = canvas;
	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);
	
	this._selectedObject = null;
	
	this._setup();
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
	this._addHandToCanvas();
	this._addReflectiveCubeToCanvas([0, -0.75, -3]);
	this._addVideoCubeToCanvas([1.5, -0.75, -3]);
	this._addTextCubeToCanvas([-1.5, -0.75, -3], "7");
	this._addRoomToCanvas();
	this._addQuestionToCanvas();
}

Game.prototype._addReflectiveCubeToCanvas = function(centerXYZ) {
	var reflectiveCube = new Rectangle(this._canvas, centerXYZ, 0.5);
	reflectiveCube.setTexture("http://www.visineat.com/js/img/textures/wood_tile.jpg");
	reflectiveCube.enableDefaultReflection();
	reflectiveCube.drawSetup = function() {
		this.rotate(0.01, 0.01, 0.01);
	}
	reflectiveCube.addToCanvas();
}

Game.prototype._addVideoCubeToCanvas = function(centerXYZ) {
	var videoCube = new Rectangle(this._canvas, centerXYZ, 0.5);
	videoCube.disablePicking(false);
	videoCube.setVideoTexture("../data/textures/abstract_light_hd.mp4");
	videoCube.disableShading();
	
	videoCube.drawSetup = function() {
		this.getTexture().update();
		this.rotate(0.01, 0.01, 0.01);
	}
	videoCube.addToCanvas();
}

Game.prototype._addHandToCanvas = function() {
	var hand = new Hand(this._canvas);
	hand.addToCanvas();
}

Game.prototype._addRoomToCanvas = function() {
	var self = this;
	var center = [0, 0, 0];
	var room = new Rectangle(this._canvas, center, 3, 4, 8);
	room.setTexture("../data/textures/dark_wood.jpg");
	room.disableShading();
	
	var startTime = new Date().getTime();
	room.drawSetup = function() {
		var currentTime = new Date().getTime();
		var elapsedTime = currentTime - startTime;
		if(elapsedTime%1000 < 20) // entered approximately every 1 second
			this.setColors(self._getNewRoomColors());
	}
	room.addToCanvas();
}

Game.prototype._getNewRoomColors = function() {
	var colors = [];
	for(var i = 0; i < 24; i++) {
		if(i > 20) {
			colors.push(Math.random());
			colors.push(Math.random());
			colors.push(Math.random());
		}
		else {
			colors.push(1);
			colors.push(1);
			colors.push(1);
		}
	}
	return colors;
}

Game.prototype._addQuestionToCanvas = function() {
	var center = [0, 0, 0];
	var text = "Which numbers are divisible by 3?";
	
	var question = new DrawableObject(this._canvas);
	question.setCenter(center);
	question.setTexture(this._createWhiteText(text, 60).getTexture());
	question.setXYZ([-1.25,1.25,0, 1.25,1.25,0, -1.25,-1.25,0, 1.25,-1.25,0]);
	question.setTriangles([0,2,1, 1,2,3]);
	question.setUV([0,1, 1,1, 0,0, 1,0]);
	question.disableShading();
	
	question.translate(0, 0, -4);
	question.translate(0, 0, 0.0001);
	question.addToCanvas();
}

Game.prototype._addTextCubeToCanvas = function(centerXYZ, text) {
	var textCube = new Rectangle(this._canvas, centerXYZ, 0.5);
	textCube.disablePicking(false);
	textCube.setTexture(this._createBlackText(text, 60).getTexture());
	
	textCube.drawSetup = function() {
		this.rotate(0.01, 0.01, 0.01);
	}
	textCube.addToCanvas();
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
	var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
	if(gesture.state == "start")
		this._selectedObject = this._canvas.getObjectAt(pixel[0], pixel[1]);
	else if(gesture.state == "update" && this._selectedObject != null)
		this._selectedObject.placeAt(pinchCenter);
}

Game.prototype._onCircle = function(gesture) {}
Game.prototype._onKeyTap = function(gesture) {
	console.log("onKeyTap: [" + gesture.position + "]");
}
Game.prototype._onScreenTap = function(gesture) {
	console.log("onScreenTap: [" + gesture.position +"]");
}
Game.prototype._onSwipe = function(gesture) {}
