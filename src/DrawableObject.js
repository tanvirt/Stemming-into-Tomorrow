function DrawableObject(canvas) {
	if(arguments.length < 1) return;
	WebGLObject.call(this, canvas);
	
	this._id = CanvasMath.generateUniqueString(10);
	this._canvas = canvas;
	this._center = null;
} DrawableObject.prototype = new WebGLObject();

DrawableObject.prototype.getId = function() { return this._id; }

// DEV: should "ready to draw" be determined only by xyz coordinates?
DrawableObject.prototype.readyToDraw = function() {
	return this.buffers["aXYZ"] != undefined &&
		this.buffers["aXYZ"].data.length > 0;
}

DrawableObject.prototype.getCenter = function() { return this._center; }
DrawableObject.prototype.setCenter = function(xyz) { this._center = xyz; }

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.removeFromCanvas = function() {
	this._canvas.removeDrawableObject(this);
}

DrawableObject.prototype.drawSetup = function() {}

DrawableObject.prototype.translate = function(x, y, z) {
	if(this._center != null)
		this._translateCenter(x, y, z);
	var xyz = this._getTranslatedXYZ(x, y, z);
	this.setXYZ(xyz);
	this._canvas.updatePickingMap();
}

DrawableObject.prototype.placeAt = function(xyz) {
	if(this._center == null)
		return;
	
	var dx = xyz[0] - this._center[0];
	var dy = xyz[1] - this._center[1];
	var dz = xyz[2] - this._center[2];
	
	this.translate(dx, dy, dz);
}

DrawableObject.prototype.rotate = function(thetaX, thetaY, thetaZ) {
	if(this._center != null)
		this._rotateCenter(thetaX, thetaY, thetaZ);
	var xyz = this._getRotatedXYZ(thetaX, thetaY, thetaZ);
	this.setXYZ(xyz);
	this._canvas.updatePickingMap();
}

DrawableObject.prototype._translateCenter = function(x, y, z) {
	this._center[0] = this._center[0] + x;
	this._center[1] = this._center[1] + y;
	this._center[2] = this._center[2] + z;
}

DrawableObject.prototype._rotateCenter = function(thetaX, thetaY, thetaZ) {
	this._center = CanvasMath.getRotatedXYZ(this._center, thetaX, thetaY, thetaZ);
}

DrawableObject.prototype._getTranslatedXYZ = function(x, y, z) {
	var xyz = this.buffers["aXYZ"].data;
	for(var i = 0; i < xyz.length; i++) {
		if(i%3 == 0) 				// x-coordinate
			xyz[i] = xyz[i] + x;
		else if(i%3 == 1) 			// y-coordinate
			xyz[i] = xyz[i] + y;
		else 						// z-coordinate
			xyz[i] = xyz[i] + z;
	}
	return xyz;
}

DrawableObject.prototype._getRotatedXYZ = function(thetaX, thetaY, thetaZ) {
	var xyz = this.buffers["aXYZ"].data;
	for(var i = 0; i < xyz.length; i += 3) {
		var vec = [xyz[i], xyz[i + 1], xyz[i + 2]];
		var rotatedVec = CanvasMath.getRotatedXYZ(vec, thetaX, thetaY, thetaZ);
		xyz[i] = rotatedVec[0];
		xyz[i + 1] = rotatedVec[1];
		xyz[i + 2] = rotatedVec[2];
	}
	return xyz;
}
