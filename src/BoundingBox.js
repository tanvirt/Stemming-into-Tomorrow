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
	// TODO: update half extents
	/*
	var xyz = this.getXYZ();
	
	var point1 = [xyz[3], xyz[4], xyz[5]];
	var point2 = [xyz[6], xyz[7], xyz[8]];
	var point3 = [xyz[13], xyz[14], xyz[15]];
	*/
}

BoundingBox.prototype.scale = function(scale) {
	this._halfExtents[0] *= scale[0];
	this._halfExtents[1] *= scale[1];
	this._halfExtents[2] *= scale[2];
}

BoundingBox.prototype.contains = function(boundingBox) {
	var position = boundingBox.getPosition();
	var halfExtents = boundingBox.getHalfExtents();
	
	for(var i = 0; i < 3; i++)
		if(position[i] + halfExtents[i] > this._position[i] + this._halfExtents[i] || 
				position[i] - halfExtents[i] < this._position[i] - this._halfExtents[i])
			return false;
	
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
