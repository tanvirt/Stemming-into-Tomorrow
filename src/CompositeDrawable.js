function CompositeDrawable(canvas) {
	if(arguments < 1) return;
	DrawableObject.call(this, canvas);
	
	this._drawableComponents = [];
} CompositeDrawable.prototype = new DrawableObject();

CompositeDrawable.prototype.add = function(drawableObject) {
	this._drawableComponents.push(drawableObject);
	if(this._center == null && this._drawableComponents.length == 1)
		this._center = this._drawableComponents[0].getCenter();
	else
		this._center = this._calculateCenter();
}

// DEV: the calculated center can be skewed if there are many objects in one area
CompositeDrawable.prototype._calculateCenter = function() {
	var total = [0, 0, 0];
	var length = this._drawableComponents.length;
	for(var i = 0; i < length; i++) {
		if(this._drawableComponents[i].getCenter() == null)
			return null;
		total[0] += this._drawableComponents[i].getCenter[0];
		total[1] += this._drawableComponents[i].getCenter[1];
		total[2] += this._drawableComponents[i].getCenter[2];
	}
	var center = [
		total[0]/length,
		total[1]/length,
		total[2]/length
	];
	return center;
}
