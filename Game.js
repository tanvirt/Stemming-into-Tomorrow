function Game(Canvas, InputDevice) {
	if(arguments.length < 2) return;
	
	this._canvas = Canvas;
	this._inputDevice = InputDevice;
	this._inputDevice.addGestureListener(this);
	this._setup();
} Game.prototype = new GestureListener();

Game.prototype.onPinch = function(pinchCenter) {
	var webGLCanvas = canvas.getWebGLCanvas();
	var pinchPoint = new Point3d(pinchCenter[0], pinchCenter[1], pinchCenter[2]);
	var pixel = CanvasMath.getProjectedPixelPoint(canvas, pinchPoint);
	var obj = webGLCanvas.getObjectAt(pixel.getX(), pixel.getY());
	
	if(obj != null && this._newObj.graphic != obj && obj._center != null) {
		this._newObj.graphic = obj;
		this._newObj.setCenter(new Point3d(obj._center[0], obj._center[1], obj._center[2]));
	}
	else if(obj != null && this._newObj.graphic == obj) {
		var objDepth = webGLCanvas.getXYZAt(pixel.getX(), pixel.getY())[2];
		//if(Math.abs(objDepth - pinchCenter[2]) < 0.25)
			this._newObj.placeAt(new Point3d(pinchCenter[0], pinchCenter[1], pinchCenter[2]));
	}
}

Game.prototype._setup = function() {
	this._addRectangleToCanvas();
	this._newObj = new DrawableObject(this._canvas);
}

Game.prototype._addRectangleToCanvas = function() {
	var rectangle = new Rectangle(canvas, new Point3d(0, 0, 0), 0.1, 0.1, 0.1);
	rectangle.graphic._center = [0, 0, 0]; // Dev: created temp center member here
	rectangle.graphic.setDrawModeLines();
	rectangle.addToCanvas();
}
