function Animation(drawableObject, callback) {
	this._drawableObject = drawableObject;
	this._callback = callback;
}

Animation.prototype.animate = function() {
	this._callback(this._drawableObject);
}
