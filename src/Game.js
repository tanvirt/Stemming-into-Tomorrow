// Implements the GestureListener interface.
function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = canvas;
	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);
	
	this._newObj = new DrawableObject(this._canvas); // Dev: created temp obj here
	
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
	//this._addRectangleToCanvas();
}

Game.prototype._addHandToCanvas = function() {
	var hand = new Hand(this._canvas);
	hand.addToCanvas();
}

Game.prototype._addRectangleToCanvas = function() {
	var center = [0, 0, 0];
	var rectangle = new Rectangle(this._canvas, center, 0.1, 0.1, 0.1);
	rectangle.setDrawModeLines();
	rectangle.addToCanvas();
}

Game.prototype._addTextCubeToCanvas = function() {
	var text = new Text(my_canvas, "Hello World!");
	text.setBackgroundColor("white");
	text.setTextColor("black");
	text.setTextHeight(60);
	text.enableSquareTexture();
	var textCube = new DrawableObject(my_canvas);
	
	textCube.setXYZ([-0.1,0.1,0.1, 0.1,0.1,0.1, -0.1,-0.1,0.1, 0.1,-0.1,0.1, -0.1,0.1,-0.1, 0.1,0.1,-0.1, -0.1,-0.1,-0.1, 0.1,-0.1,-0.1, 0.1,0.1,0.1, 0.1,-0.1,0.1, 0.1,0.1,-0.1, 0.1,-0.1,-0.1, -0.1,0.1,0.1, -0.1,-0.1,0.1, -0.1,0.1,-0.1, -0.1,-0.1,-0.1, -0.1,0.1,0.1, 0.1,0.1,0.1, -0.1,0.1,-0.1, 0.1,0.1,-0.1, -0.1,-0.1,0.1, 0.1,-0.1,0.1, -0.1,-0.1,-0.1, 0.1,-0.1,-0.1]);
	textCube.setUV([0,1, 1,1, 0,0, 1,0, 1,1, 0,1, 1,0, 0,0, 0,1, 0,0, 1,1, 1,0, 1,1, 1,0, 0,1, 0,0, 0,0, 1,0, 0,1, 1,1, 1,0, 0,0, 1,1, 0,1]);
	textCube.setTriangles([0,2,1, 1,2,3, 4,5,6, 6,5,7, 9,11,8, 8,11,10, 13,12,15, 15,12,14, 16,17,18, 18,17,19, 21,20,22, 21,22,23]);
	textCube.setTexture(text.getTexture());
	textCube.setCenter([0,0,0]);
	textCube.addToCanvas();
}

// DEV: does not work when the canvas projector is changed
Game.prototype._onPinch = function(gesture) {
	var pinchCenter = gesture.position;
	var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
	var obj = this._canvas.getObjectAt(pixel[0], pixel[1]);
	
	if(obj != null && this._newObj != obj && obj.getCenter() != null) {
		this._newObj = obj;
		this._newObj.setCenter(obj.getCenter());
	}
	else if(obj != null && this._newObj == obj)
		this._newObj.placeAt(pinchCenter);
}

Game.prototype._onCircle = function(gesture) {}
Game.prototype._onKeyTap = function(gesture) {
	console.log("onKeyTap: [" + gesture.position + "]");
}
Game.prototype._onScreenTap = function(gesture) {
	console.log("onScreenTap: [" + gesture.position +"]");
}
Game.prototype._onSwipe = function(gesture) {}
