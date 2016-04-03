function DrawableObject(canvas) {
	if(arguments.length < 1) return;
	GLObject.call(this, canvas);
	
	this._id = CanvasMath.generateUniqueString(10);
	this._canvas = canvas;
	this.disablePicking(true);
	
	this._rotation = [0, 0, 0];
	this._position = [0, 0, 0];
	this._scale = [1, 1, 1];
	
	this._lastMoved = new Date().getTime();
	this._velocity = 0;
	this._direction = [0, 0, 0];
	
	this._boundingBox = new BoundingBox(0); // DEV: consider calculating dimensions based on xyz's
	
	this.eventHandlerList = new AssociativeArray();
} DrawableObject.prototype = new GLObject();

DrawableObject.prototype.getBoundingBox = function() { return this._boundingBox; }

DrawableObject.prototype.drawBoundingBox = function() {
	var xyz = this._getBoundingBoxXYZ();
	var triangles = this._getBoundingBoxTriangles();
	var colors = this._getBoundingBoxColors();
	
	var view = new DrawableObject(this._canvas);
	
	view.setXYZ(xyz);
	view.setTriangles(triangles);
	view.setColors(colors);
	view.setDrawModeLines();
	
	view.draw();
}

DrawableObject.prototype.intersects = function(drawableObject) {
	return this._boundingBox.intersects(drawableObject.getBoundingBox());
}

DrawableObject.prototype.addBoundingBox = function(height, width, depth) {
	this._boundingBox = new BoundingBox(height, width, depth);
	this._boundingBox.setPosition(this._position);
	this._boundingBox.scale(this._scale);
	this._boundingBox.recalculate(this._rotation);
}

DrawableObject.prototype.getId = function() { return this._id; }

// DEV: should "ready to draw" be determined only by xyz coordinates?
DrawableObject.prototype.readyToDraw = function() {
	return 	this.buffers["aXYZ"] != undefined &&
			this.buffers["aXYZ"].data.length > 0;
}

DrawableObject.prototype.enableDefaultReflection = function(reflectionImage) {
	var material = new GLMaterial(this._canvas);
	//material.setSpecularColor([1,1,1]);
	//material.setSpecularExponent(10);
	material.setMatCap("http://www.visineat.com/js/img/matcap/matcap3.jpg");
	material.setReflection(reflectionImage);
	material.setReflectionColor([0.2,0.1,0.1]);
	
	this.setMaterial(material);
	//this.getShader().setLightingDirection([-0.5, 1, 1.5]);
}

DrawableObject.prototype.enableShading = function() {
	this.getShader().useLighting(true);
}

DrawableObject.prototype.disableShading = function() {
	this.getShader().useLighting(false);
}

DrawableObject.prototype.enableTexture = function() {
	this.getShader().useTexture(true);
}

DrawableObject.prototype.disableTexture = function() {
	this.getShader().useTexture(false);
}

DrawableObject.prototype.enableColors = function() {
	this.getShader().useColors(true);
}

DrawableObject.prototype.disableColors = function() {
	this.getShader().useColors(false);
}

DrawableObject.prototype.setColorMask = function(rgba) {
	this.getShader().setColorMask(rgba);
}

DrawableObject.prototype.addToCanvas = function() {
	this._canvas.addDrawableObject(this);
}

DrawableObject.prototype.removeFromCanvas = function() {
	this._canvas.removeDrawableObject(this);
}

DrawableObject.prototype.drawSetup = function() {} // hook operation

DrawableObject.prototype.getRotation = function() { return this._rotation; }
DrawableObject.prototype.getPosition = function() { return this._position; }
DrawableObject.prototype.getScale = function() { return this._scale; }
DrawableObject.prototype.getVelocity = function() {	return this._velocity; }
DrawableObject.prototype.getDirection = function() { return this._direction; }

DrawableObject.prototype.setPosition = function(xyz) {
	var changeInTime = new Date().getTime() - this._lastMoved;
	var vector = CanvasMath.createVec3(this._position, xyz);
	var magnitude = CanvasMath.getVec3Magnitude(vector);
	
	this._direction = CanvasMath.getDirectionVec3(vector, magnitude);
	this._velocity = (magnitude/changeInTime)*1000; // distance per second
	this._position = xyz;
	this._lastMoved = new Date().getTime();
	
	this._boundingBox.setPosition(this._position);
}

DrawableObject.prototype.rotate = function(thetaX, thetaY, thetaZ) {
	this._rotation[0] += thetaX;
	this._rotation[1] += thetaY;
	this._rotation[2] += thetaZ;
	
	if(this._rotation[0] > 2*Math.PI)
		this._rotation[0] = 2*Math.PI - this._rotation[0];
	if(this._rotation[1] > 2*Math.PI)
		this._rotation[1] = 2*Math.PI - this._rotation[1];
	if(this._rotation[2] > 2*Math.PI)
		this._rotation[2] = 2*Math.PI - this._rotation[2];
	
	this._boundingBox.recalculate([thetaX, thetaY, thetaZ]);
}

DrawableObject.prototype.translate = function(x, y, z) {
	var xyz = [
		this._position[0] + x,
		this._position[1] + y,
		this._position[2] + z
	];
	
	this.setPosition(xyz);
}

DrawableObject.prototype.scale = function(width, height, depth) {
	this._scale[0] *= width;
	this._scale[1] *= height;
	this._scale[2] *= depth;
	
	this._boundingBox.scale([width, height, depth]);
}

DrawableObject.prototype._getBoundingBoxXYZ = function() {
	var position = this._boundingBox.getPosition();
	var halfExtents = this._boundingBox.getHalfExtents();
	
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

DrawableObject.prototype._getBoundingBoxTriangles = function() {
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

DrawableObject.prototype._getBoundingBoxColors = function() {
	var colors = [
  		// front face
  		1,1,1, 0,0,1, 0,1,0, 0,1,1,
  		
  		// back face
  		1,0,0, 1,0,1, 1,1,0, 1,1,1
  	];
	
	return colors;
}






//TODO add some type of dispatcher for the below to use
DrawableObject.prototype.addEventListener = function(eventType, eventHandler) {
	EventDispatcher.register(eventType, this);  //TODO
	this._addEventHandlerToList(eventType, eventHandler);
}

//The below is called by the drawable list????
DrawableObject.prototype.interact = function(event, drawableObject) {
	this._getEventHandler(event).handle(this, drawableObject);
	
	//Maybe... Huh???? what if the above destroys the drawableObject...... Template Method....???
	drawableObject.interact(eventType, this);
}

DrawableObject.prototype._getEventHandler = function(eventType) {
	if(this._eventExists(eventType))
		return this.eventHandlerList.get(key);
	else
		console.log("EventHandler for type: " + key + " does not exist! :(");
	return null;
}

DrawableObject.prototype._addEventHandlerToList = function(eventType, eventHandler) {
	this.eventHandlerList.put(eventType, eventHandler);
}

DrawableObject.prototype._eventExists = function(eventType) {
	return this.eventHandlerList.containsKey(eventType);
}

//drawable.addEventListener(new CollisionEvent(), new EventHandler());
