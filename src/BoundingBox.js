function BoundingBox(height, width, depth) {
	this._position = [0, 0, 0];
	this._halfExtents = this._createHalfExtents(width, height, depth);
}

BoundingBox.prototype.setPosition = function(xyz) { this._position = xyz; }
BoundingBox.prototype.getPosition = function() { return this._position; }
BoundingBox.prototype.getHalfExtents = function() { return this._halfExtents; }

BoundingBox.prototype._createHalfExtents = function(width, height, depth) {
	var halfExtents = [];
	
	if(width == undefined)
		halfExtents.push(height/2);
	else
		halfExtents.push(width/2);
	
	halfExtents.push(height/2);
	
	if(depth == undefined)
		halfExtents.push(height/2);
	else
		halfExtents.push(depth/2);
	
	return halfExtents;
}

BoundingBox.prototype.recalculate = function(rotation) {
	// TODO: fix this
	// TODO: update half extents
	/*
	var xyz = this.getXYZ();
	
	var point1 = [xyz[3], xyz[4], xyz[5]];
	var point2 = [xyz[6], xyz[7], xyz[8]];
	var point3 = [xyz[13], xyz[14], xyz[15]];
	
	var rotatedPoint1 = CanvasMath.getRotatedXYZ(point1, this._position, rotation[0], rotation[1], rotation[2]);
	var rotatedPoint2 = CanvasMath.getRotatedXYZ(point2, this._position, rotation[0], rotation[1], rotation[2]);
	var rotatedPoint3 = CanvasMath.getRotatedXYZ(point3, this._position, rotation[0], rotation[1], rotation[2]);
	
	var maximumX = Math.max(Math.abs(rotatedPoint1[0]), Math.abs(rotatedPoint2[0]), Math.abs(rotatedPoint3[0]));
	var maximumY = Math.max(Math.abs(rotatedPoint1[1]), Math.abs(rotatedPoint2[1]), Math.abs(rotatedPoint3[1]));
	var maximumZ = Math.max(Math.abs(rotatedPoint1[2]), Math.abs(rotatedPoint2[2]), Math.abs(rotatedPoint3[2]));
	*/
	/*this._halfExtents[0] = Math.abs(this._position[0] - maximumX);
	this._halfExtents[1] = Math.abs(this._position[1] - maximumY);
	this._halfExtents[2] = Math.abs(this._position[2] - maximumZ);*/
}

BoundingBox.prototype.scale = function(scale) {
	this._halfExtents[0] *= scale[0];
	this._halfExtents[1] *= scale[1];
	this._halfExtents[2] *= scale[2];
}

BoundingBox.prototype.contains = function(boundingBox) {
	var position = boundingBox.getPosition();
	var halfExtents = boundingBox.getHalfExtents();
	
	for(var i = 0; i < 3; i++) {
		if(position[i] + halfExtents[i] > this._position[i] + this._halfExtents[i] || 
				position[i] - halfExtents[i] < this._position[i] - this._halfExtents[i])
			return false;
	}
	return true;
}

BoundingBox.prototype.intersects = function(boundingBox) {
	var position = boundingBox.getPosition();
	var halfExtents = boundingBox.getHalfExtents();
	
	for(var i = 0; i < 3; i++)
		if(Math.abs(this._position[i] - position[i]) > (this._halfExtents[i] + halfExtents[i]))
			return false;
	
	return true;
}

BoundingBox.prototype.getXYZ = function() {
	var position = this._position;
	var halfExtents = this._halfExtents;
	
	var xyz = [
 	    // front face
 		position[0] - halfExtents[0], position[1] + halfExtents[1], position[2] + halfExtents[2],
 		position[0] + halfExtents[0], position[1] + halfExtents[1], position[2] + halfExtents[2],
 		position[0] - halfExtents[0], position[1] - halfExtents[1], position[2] + halfExtents[2],
 		position[0] + halfExtents[0], position[1] - halfExtents[1], position[2] + halfExtents[2],
 		
 		// back face
 		position[0] - halfExtents[0], position[1] + halfExtents[1], position[2] - halfExtents[2],
 		position[0] + halfExtents[0], position[1] + halfExtents[1], position[2] - halfExtents[2],
 		position[0] - halfExtents[0], position[1] - halfExtents[1], position[2] - halfExtents[2],
 		position[0] + halfExtents[0], position[1] - halfExtents[1], position[2] - halfExtents[2]
 	];
   	
   	return xyz;
}
