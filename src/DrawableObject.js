function DrawableObject(canvas) {
	if(arguments.length < 1) return;
	GLObject.call(this, canvas);
	
	this._id = CanvasMath.generateUniqueString(10);
	this._canvas = canvas;
	this.disablePicking(true);
	
	this._rotation = [0, 0, 0];
	this._position = [0, 0, 0];
	this._scale = [1, 1, 1];
	
	this._boundingBox = null;
	
	this.eventHandlerList = new AssociativeArray();
} DrawableObject.prototype = new GLObject();

DrawableObject.prototype.getBoundingBox = function() { return this._boundingBox; }

DrawableObject.prototype.intersects = function(drawableObject) {
	return this._boundingBox.intersects(drawableObject.getBoundingBox());
}

DrawableObject.prototype.drawBoundingBox = function() {
	if(this._boundingBox != null)
		this._boundingBox.draw();
}

DrawableObject.prototype.addBoundingBox = function(height, width, depth) {
	this._boundingBox = new BoundingBox(this._canvas, height, width, depth);
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

DrawableObject.prototype.setPosition = function(xyz) { 
	this._position = xyz;
	
	if(this._boundingBox != null)
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
	
	if(this._boundingBox != null)
		this._boundingBox.recalculate([thetaX, thetaY, thetaZ]);
}

DrawableObject.prototype.translate = function(x, y, z) {
	this._position[0] += x;
	this._position[1] += y;
	this._position[2] += z;
	
	if(this._boundingBox != null)
		this._boundingBox.setPosition(this._position);
}

DrawableObject.prototype.scale = function(width, height, depth) {
	this._scale[0] *= width;
	this._scale[1] *= height;
	this._scale[2] *= depth;
	
	if(this._boundingBox != null)
		this._boundingBox.scale([width, height, depth]);
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
