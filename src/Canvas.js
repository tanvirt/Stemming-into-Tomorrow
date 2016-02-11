function Canvas(inputDevice, elementId) {
    if(arguments.length < 1) return;
    this._elementId = elementId;
    if(this._elementId == undefined)
    	this._elementId = this._createCanvasContainerElement().id;
    WebGLCanvas.call(this, this._elementId);
    
    this._inputDevice = inputDevice;
    this._drawableList = new DrawableList();
    this._room = null;
    
    this.start();
} Canvas.prototype = new WebGLCanvas();

Canvas.prototype.setRoom = function(filePath) {
	this._room = new WebGLImageComposition(this);
	this._room.load(filePath);
}

Canvas.prototype.addDrawableObject = function(drawableObject) {
    this._drawableList.add(drawableObject);
}

Canvas.prototype.getCurrentInputData = function() {
    return this._inputDevice.getPoints();
}

Canvas.prototype._createCanvasContainerElement = function() {
	var container = document.createElement("DIV");
	
	container.id = "canvas_container";
	container.style.position = "absolute";
	container.style.width = "100%";
	container.style.top = "0px";
	container.style.bottom = "0px";
	container.style.right = "0px";
	
	document.body.appendChild(container);
	
	return container;
}

Canvas.prototype.onSetup = function() {
    this.setBackgroundColor(0, 0, 0);
    this.setLoadingStatus(false);
}

Canvas.prototype.onDraw = function() {
    var gl = this.getGL();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(this._room != null)
    	this._room.draw();
    this._drawableList.draw();
}
