//function BoundingBox(height, width, depth) {
function BoundingBox(width, height, depth) {
	this._position = [0, 0, 0];
	this._halfExtents = this._createHalfExtents(width, height, depth);
	this._originalHalfExtents = this._halfExtents.slice();
	
	this._xyz = this.getXYZ();
}

BoundingBox.prototype.setPosition = function(xyz) { this._position = xyz; }
BoundingBox.prototype.getPosition = function() { return this._position; }
BoundingBox.prototype.getHalfExtents = function() { return this._halfExtents; }

BoundingBox.prototype._createHalfExtents = function(width, height, depth) {
	var halfExtents = [];
	
	halfExtents.push(width/2);
	halfExtents.push(height/2);
	halfExtents.push(depth/2);
	
	return halfExtents;
}

BoundingBox.prototype.recalculate = function(rotation) {
	// TODO
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

BoundingBox.prototype.getOriginalXYZ = function() {
	var position = this._position;
	var halfExtents = this._originalHalfExtents;
	
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
