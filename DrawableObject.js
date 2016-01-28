function DrawableObject(Canvas) {
	this.graphic = new WebGLObject(c);
	this._canvas = Canvas;
	/*
		Object methods are listed under the class definition
	*/

} DrawableObject.prototype = new WebGLObject(c);


/*
	Convention:

		_classMethod --> indicates a private method that should not be used.

		classMethod  --> indicates a public method that is part of the object interface.
*/

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.draw = function() {
	//Draw callback
}