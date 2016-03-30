function DrawableObject(canvas) {
	if(arguments.length < 1) return;
	WebGLObject.call(this, canvas);
	
	this._id = CanvasMath.generateUniqueString(10);
	this._canvas = canvas;
	this._center = null;
	this.disablePicking(true);
	
	this.eventHandlerList = new AssociativeArray();
} DrawableObject.prototype = new WebGLObject();

DrawableObject.prototype.getId = function() { return this._id; }

// DEV: should "ready to draw" be determined only by xyz coordinates?
DrawableObject.prototype.readyToDraw = function() {
	return 	this.buffers["aXYZ"] != undefined &&
			this.buffers["aXYZ"].data.length > 0;
}

DrawableObject.prototype.enableDefaultReflection = function() {
	var material = new WebGLMaterial(this._canvas);
	//material.setSpecularColor([1,1,1]);
	//material.setSpecularExponent(10);
	material.setMatCap("http://www.visineat.com/js/img/matcap/matcap3.jpg");
	material.setReflection("http://www.visineat.com/js/img/hdri/country1.jpg");
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

// DEV: rotation of xyz needs to be synchronized with normals
DrawableObject.prototype.rotate = function(thetaX, thetaY, thetaZ) {
	if(this._center == null)
		return;
	this._rotateCenter(thetaX, thetaY, thetaZ);
	var xyz = this._getRotatedXYZ(thetaX, thetaY, thetaZ);
	this.setXYZ(xyz);
	
	if(this.buffers["aNormal"] != undefined &&
			this.buffers["aNormal"].data.length > 0) {
		var normals = this._getRotatedNormals(thetaX, thetaY, thetaZ);
		this.setNormals(normals);
	}
	
	// DEV: WebGLCanvas.updatePickingMap() sometimes causes "maximum call stack exceeded errors"
	//this._canvas.updatePickingMap();
}

DrawableObject.prototype._translateCenter = function(x, y, z) {
	this._center[0] = this._center[0] + x;
	this._center[1] = this._center[1] + y;
	this._center[2] = this._center[2] + z;
}

DrawableObject.prototype._rotateCenter = function(thetaX, thetaY, thetaZ) {
	this._center = CanvasMath.getRotatedXYZ(this._center, this._center, thetaX, thetaY, thetaZ);
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
		var vector = [xyz[i], xyz[i + 1], xyz[i + 2]];
		var rotatedVector = CanvasMath.getRotatedXYZ(vector, this._center, thetaX, thetaY, thetaZ);
		xyz[i] = rotatedVector[0];
		xyz[i + 1] = rotatedVector[1];
		xyz[i + 2] = rotatedVector[2];
	}
	return xyz;
}

DrawableObject.prototype._getRotatedNormals = function(thetaX, thetaY, thetaZ) {
	var normals = this.buffers["aNormal"].data;
	var center = [0, 0, 0];
	for(var i = 0; i < normals.length; i += 3) {
		var vector = [normals[i], normals[i + 1], normals[i + 2]];
		var rotatedVector = CanvasMath.getRotatedXYZ(vector, center, thetaX, thetaY, thetaZ);
		normals[i] = rotatedVector[0];
		normals[i + 1] = rotatedVector[1];
		normals[i + 2] = rotatedVector[2];
	}
	
	return normals;
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

drawable.addEventListener(new CollisionEvent(), new EventHandler());
