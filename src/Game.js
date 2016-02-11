// Implements the GestureListener interface.
function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = canvas;
	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);
	
	this._newObj = new DrawableObject(this._canvas); // Dev: created temp obj here
	
	this._setup();
}

Game.prototype.onPinch = function(gesture) {
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

Game.prototype.onCircle = function(gesture) {}
Game.prototype.onKeyTap = function(gesture) {
	console.log('onKeyTap: [' + gesture.position + ']');
}
Game.prototype.onScreenTap = function(gesture) {
	console.log('onScreenTap: [' + gesture.position +']');
}
Game.prototype.onSwipe = function(gesture) {}

Game.prototype._setup = function() {
	this._addHandToCanvas();
	this._addRectangleToCanvas();
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
