function DrawableObject(Canvas) {
	if(arguments.length != 1) return;

	this.graphic = new WebGLObject(Canvas.getWebGLCanvas());
	this._canvas = Canvas;
}

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.draw = function() {}
