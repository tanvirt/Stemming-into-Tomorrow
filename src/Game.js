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
	this._addTextCubeToCanvas();
	this._addRoomToCanvas();
	this._addQuestionToCanvas();
}

Game.prototype._addHandToCanvas = function() {
	var hand = new Hand(this._canvas);
	hand.addToCanvas();
}

Game.prototype._addRoomToCanvas = function() {
	var center = [0, 0, 0];
	var room = new Rectangle(this._canvas, center, 3, 4, 4);
	room.addToCanvas();
}

Game.prototype._addQuestionToCanvas = function() {
	var center = [0, 0, 0];
	var text = "Which numbers are divisible by 5?";
	
	var question = new DrawableObject(this._canvas);
	question.setCenter(center);
	question.setTexture(this._createText(text, 60).getTexture());
	
	question.setXYZ([-1.25,1.25,-2, 1.25,1.25,-2, -1.25,-1.25,-2, 1.25,-1.25,-2]);
	question.setTriangles([0,2,1, 1,2,3]);
	question.setUV([0,1, 1,1, 0,0, 1,0]);
	
	question.translate(0, 0, .01);
	question.addToCanvas();
}

Game.prototype._addTextCubeToCanvas = function() {
	var center = [1.7, -0.7, -1.5];
	var text = "15"
	
	var textCube = new Rectangle(this._canvas, center, 0.5);
	textCube.setTexture(this._createText(text, 60).getTexture());
	textCube.enableShading();
	textCube.enablePicking();
	
	textCube.addToCanvas();
}

Game.prototype._createText = function(string, height) {
	var text = new Text(this._canvas, string);
	text.setBackgroundColor("white");
	text.setTextColor("black");
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
