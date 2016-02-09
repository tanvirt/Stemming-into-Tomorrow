function Game(canvas, inputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = canvas;
	this._inputDevice = inputDevice;
	this._inputDevice.addGestureListener(this);
	this._setup();
} Game.prototype = new GestureListener();

Game.prototype.onPinch = function(pinchCenter) {
	var webGLCanvas = this._canvas.getWebGLCanvas();
	var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
	var obj = webGLCanvas.getObjectAt(pixel[0], pixel[1]);
	
	if(obj != null && this._newObj.graphic != obj && obj._center != null) {
		this._newObj.graphic = obj;
		this._newObj.setCenter(obj._center);
	}
	else if(obj != null && this._newObj.graphic == obj) {
		var objDepth = webGLCanvas.getXYZAt(pixel[0], pixel[1])[2];
		//if(Math.abs(objDepth - pinchCenter[2]) < 0.25)
			this._newObj.placeAt(pinchCenter);
	}
}

Game.prototype._setup = function() {
	this._addHandToCanvas();
	this._addRectangleToCanvas();
	this._newObj = new DrawableObject(this._canvas);
}

Game.prototype._addHandToCanvas = function() {
	var hand = new Hand(this._canvas);
	hand.addToCanvas();
}

Game.prototype._addRectangleToCanvas = function() {
	var center = [0, 0, 0];
	var rectangle = new Rectangle(this._canvas, center, 0.1, 0.1, 0.1);
	rectangle.graphic._center = [0, 0, 0]; // Dev: created temp center member here
	rectangle.graphic.setDrawModeLines();
	rectangle.addToCanvas();
}
