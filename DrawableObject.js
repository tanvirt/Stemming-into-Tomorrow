function DrawableObject(Canvas) {
	if(arguments.length > 1) return;
	
	this._canvas = Canvas;
	this.graphic = new WebGLObject(this._canvas.getWebGLCanvas());
	
}

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.draw = function() {}
