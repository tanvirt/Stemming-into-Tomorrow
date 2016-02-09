function DrawableObject(Canvas) {
	if(arguments.length < 1) return;
	this._canvas = Canvas;
	this.graphic = new WebGLObject(this._canvas.getWebGLCanvas());
	this._center = null;
}

DrawableObject.prototype.setCenter = function(Point3d) {
	this._center = Point3d;
}

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.draw = function() {
	// TODO 
	// Dev: should use template method
	this.graphic.updateShader();
    this.graphic.draw();
}

DrawableObject.prototype.translate = function(x, y, z) {
	if(this._center != null) {
		this._center.setX(this._center.getX() + x);
		this._center.setY(this._center.getY() + y);
		this._center.setZ(this._center.getZ() + z);
	}
	var xyz = this.graphic.buffers["aXYZ"].data;
	for(var i = 0; i < xyz.length; i++) {
		if(i%3 == 0) 				// x-coordinate
			xyz[i] = xyz[i] + x;
		else if(i%3 == 1) 			// y-coordinate
			xyz[i] = xyz[i] + y;
		else 						// z-coordinate
			xyz[i] = xyz[i] + z;
	}
	this.graphic.setXYZ(xyz);
	this._canvas.getWebGLCanvas().updatePickingMap();
}

DrawableObject.prototype.placeAt = function(Point3d) {
	if(this._center == null)
		return;
	
	var dx = Point3d.getX() - this._center.getX();
	var dy = Point3d.getY() - this._center.getY();
	var dz = Point3d.getZ() - this._center.getZ();
	
	this.translate(dx, dy, dz);
}
/*
DrawableObject.prototype.translateTo = function(Point3d, timeToTarget) {
	if(this._center == null)
		return;
	
	if(timeToTarget == 0) {
		this.placeAt(Point3d);
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
			startLocation[0] + distanceInX*distanceRatio,
			startLocation[1] + distanceInY*distanceRatio,
			startLocation[2] + distanceInZ*distanceRatio
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
