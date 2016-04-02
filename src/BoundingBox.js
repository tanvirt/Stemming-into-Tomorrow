function BoundingBox(/*canvas, */height, width, depth)  {
	//this._canvas = canvas;
	
	this._position = [0, 0, 0];
	this._halfExtents = this._createHalfExtents(width, height, depth);
	this._xyz = this.getXYZ();
	
	//this._view = this._createView(canvas); // DEV: temporary, should be removed for de-coupling
}

BoundingBox.prototype.setPosition = function(xyz) { 
	this._position = xyz; 
	this._xyz = this.getXYZ();
	//this._view = this._createView(this._canvas);
}
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
	// TODO: Fix this
	/*
	var position = boundingBox.getPosition();
	var halfExtents = boundingBox.getHalfExtents();
	console.log("My position: " + this._position);
	console.log("My half extents: " + this._halfExtents);
	console.log("Other position: " + position);
	console.log("Other half extents: " + halfExtents);
	
	for(var i = 0; i < 3; i++)
		if(Math.abs(this._position[i] - position[i]) > (this._halfExtents[i] + halfExtents[i]));
			return false;
	
	return true;
	*/
}

BoundingBox.prototype._createView = function() {
	var view = new DrawableObject(this._canvas);
	
	view.setXYZ(this.getXYZ());
	view.setTriangles(this._getTriangles());
	view.setColors(this._getColors());
	view.setDrawModeLines();
	
	return view;
}

BoundingBox.prototype.getXYZ = function() {
	var positionX = this._position[0];
	var positionY = this._position[1];
	var positionZ = this._position[2];
	
	var halfWidth = this._halfExtents[0];
	var halfHeight = this._halfExtents[1];
	var halfDepth = this._halfExtents[2];
	
	var xyz = [
  	    // front face
  		positionX - halfWidth, positionY + halfHeight, positionZ + halfDepth,
  		positionX + halfWidth, positionY + halfHeight, positionZ + halfDepth,
  		positionX - halfWidth, positionY - halfHeight, positionZ + halfDepth,
  		positionX + halfWidth, positionY - halfHeight, positionZ + halfDepth,
  		
  		// back face
  		positionX - halfWidth, positionY + halfHeight, positionZ - halfDepth,
  		positionX + halfWidth, positionY + halfHeight, positionZ - halfDepth,
  		positionX - halfWidth, positionY - halfHeight, positionZ - halfDepth,
  		positionX + halfWidth, positionY - halfHeight, positionZ - halfDepth
  	];
	
	return xyz;
}

BoundingBox.prototype._getTriangles = function() {
	var triangles = [
 		// front face
 		0,2,1, 1,2,3,
 		
 		// back face
 		4,5,6, 6,5,7,
 		
 		// right face
 		1,3,5, 5,3,7,
 		
 		// left face
 		4,6,0, 0,6,2,
 		
 		// top face
 		4,0,5, 5,0,1,
 		
 		// bottom face
 		2,6,3, 3,6,7
 	];
	
	return triangles;
}

BoundingBox.prototype._getColors = function() {
	var colors = [
  		// front face
  		1,1,1, 0,0,1, 0,1,0, 0,1,1, 
  		
  		// back face
  		1,0,0, 1,0,1, 1,1,0, 1,1,1
  	];
	
	return colors;
}

BoundingBox.prototype._updateView = function() {
	// TODO: calculate new xyz for view if needed
}

BoundingBox.prototype.draw = function() {
	this._view.updateShader(); // DEV: if changed
	this._view.draw();
}
