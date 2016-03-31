function BoundingBox(canvas, height, width, depth)  {
	this._canvas = canvas;
	
	this._position = [0, 0, 0];
	this._halfExtents = this._createHalfExtents(width, height, depth);
	
	this._view = this._createView(canvas);
}

BoundingBox.prototype.getPosition = function() { return this._position; }
BoundingBox.prototype.getHalfExtents = function() { return this.__halfExtents; }

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

BoundingBox.prototype.setPosition = function(xyz) { this._position = xyz; }

BoundingBox.prototype.recalculate = function(rotation) {
	// TODO: update half extents
}

BoundingBox.prototype.scale = function(scale) {
	this._halfExtents[0] *= scale[0];
	this._halfExtents[1] *= scale[1];
	this._halfExtents[2] *= scale[2];
}

BoundingBox.prototype.intersects = function(boundingBox) {
	var position = boundingBox.getPosition();
	var halfExtents = boundingBox.getHalfExtents();
	
	for(var i = 0; i < 3; i++)
		if(Math.abs(this._position[i] - position[i]) > (this._halfExtents[i] + halfExtents[i]));
			return false;
	
	return true;
}

BoundingBox.prototype._createView = function() {
	var view = new DrawableObject(this._canvas);
	
	var halfWidth = this._halfExtents[0];
	var halfHeight = this._halfExtents[1];
	var halfDepth = this._halfExtents[2];
	
	var xyz = [
  	    // back face
  		-halfWidth, halfHeight, halfDepth,
  		halfWidth, halfHeight, halfDepth,
  		-halfWidth, -halfHeight, halfDepth,
  		halfWidth, -halfHeight, halfDepth,
  		
  		// front face
  		-halfWidth, halfHeight, -halfDepth,
  		halfWidth, halfHeight, -halfDepth,
  		-halfWidth, -halfHeight, -halfDepth,
  		halfWidth, -halfHeight, -halfDepth
  	];
	
	var lines = [
		// back face
		0,1, 1,3, 3,2, 2,0,
		
		// front face
		4,5, 5,7, 7,6, 6,4,
		
		// connect front and back faces
		0,4, 1,5, 3,7, 2,6
	];
	
	var colors = [
		// back face
		1,1,1, 0,0,1, 0,1,0, 0,1,1, 
		
		// front face
		1,0,0, 1,0,1, 1,1,0, 1,1,1
	];
	
	view.setXYZ(xyz);
	view.setLines(lines);
	view.setColors(colors);
	
	return view;
}

BoundingBox.prototype._updateView = function() {
	// TODO: calculate new xyz for view if needed
}

BoundingBox.prototype.draw = function() {
	this._view.updateShader(); // DEV: if changed
	this._view.draw();
}
