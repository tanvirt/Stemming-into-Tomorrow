function Canvas(InputDevice, elementId) {
    if(arguments.length < 1) return;
    
    this._elementId = elementId;
    
    if(this._elementId == undefined)
    	this._elementId = this._createCanvasContainerElement().id;
    
    this._webGLCanvas = new WebGLCanvas(this._elementId);
    this._inputDevice = InputDevice;
    this._drawableList = new DrawableList();
    this._room = null;

    this._start();
}

Canvas.prototype.setRoom = function(filePath) {
	this._room = new WebGLImageComposition(this._webGLCanvas);
	this._room.load(filePath);
}

Canvas.prototype.getWebGLCanvas = function() {
    return this._webGLCanvas;
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

Canvas.prototype._start = function() {
    var self = this;
    this._webGLCanvas.onSetup = function() { self._onSetup() }
    this._webGLCanvas.onDraw = function() { self._onDraw() }
    this._webGLCanvas.start();
}

Canvas.prototype._onSetup = function() {
    this._webGLCanvas.setBackgroundColor(0, 0, 0);
    this._webGLCanvas.setLoadingStatus(false);
}

Canvas.prototype._onDraw = function() {
    var gl = this._webGLCanvas.getGL();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(this._room != null)
    	this._room.draw();
    this._drawableList.draw();
}
