function DrawableObject(canvas) {
	if(arguments.length < 1) return;
	WebGLObject.call(this, canvas);
	
	this._canvas = canvas;
	this._center = null;
	this._readyToDraw = false;
} DrawableObject.prototype = new WebGLObject();

DrawableObject.prototype.readyToDraw = function() {
	return this._readyToDraw;
}

DrawableObject.prototype.getCenter = function() {
	return this._center;
}

DrawableObject.prototype.setCenter = function(xyz) {
	this._center = xyz;
}

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.drawSetup = function() {
	this.updateShader();
}

DrawableObject.prototype.translate = function(x, y, z) {
	if(this._center != null) {
		this._center[0] = this._center[0] + x;
		this._center[1] = this._center[1] + y;
		this._center[2] = this._center[2] + z;
	}
	var xyz = this.buffers["aXYZ"].data;
	for(var i = 0; i < xyz.length; i++) {
		if(i%3 == 0) 				// x-coordinate
			xyz[i] = xyz[i] + x;
		else if(i%3 == 1) 			// y-coordinate
			xyz[i] = xyz[i] + y;
		else 						// z-coordinate
			xyz[i] = xyz[i] + z;
	}
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
/*
DrawableObject.prototype.translateTo = function(xyz, timeToTarget) {
	if(this._center == null)
		return;
	
	if(timeToTarget == 0) {
		this.placeAt(xyz);
		return;
	}
	
	var startLocation = this._center.slice();
	
	var distanceInX = x - startLocation[0];
	var distanceInY = y - startLocation[1];
	var distanceInZ = z - startLocation[2];
	
	var startTime = new Date().getTime();
	var timePassed = 0;
	
	while(timePassed <= timeToTarget) {
		var distanceRatio = timePassed/timeToTarget;
		this.placeAt(
			[startLocation[0] + distanceInX*distanceRatio,
			startLocation[1] + distanceInY*distanceRatio,
			startLocation[2] + distanceInZ*distanceRatio]
		);
		
		var currTime = new Date().getTime();
		timePassed = currTime - startTime;
	}
}
*/
DrawableObject.prototype.rotate = function(thetaX, thetaY, thetaZ) {
	this._rotateX(thetaX);
	this._rotateY(thetaY);
	this._rotateZ(thetaZ);
}

DrawableObject.prototype._rotateX = function(theta) {
	// TODO
}

DrawableObject.prototype._rotateY = function(theta) {
	// TODO
}

DrawableObject.prototype._rotateZ = function(theta) {
	// TODO
}
