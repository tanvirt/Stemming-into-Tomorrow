function Canvas(inputDevice, elementId) {
    if(arguments.length < 1) return;
    if(elementId == undefined)
    	WebGLCanvas.call(this, this._createCanvasContainerElement().id);
    else
    	WebGLCanvas.call(this, elementId);
    
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

Canvas.prototype.removeDrawableObject = function(drawableObject) {
    this._drawableList.remove(drawableObject);
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
	var self = this;
	this.getDiv().ondblclick = function() {
		self._requestFullScreen(document.body);
	}
	this.getDiv().ontouchend = function() {
		self._requestFullScreen(document.body);
	}
    this.setBackgroundColor(0, 0, 0);
    this.setLoadingStatus(false);
}

Canvas.prototype.onDraw = function() {
    var gl = this.getGL();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.getCamera().rotate(0.25, [1, 0, 0]);
    if(this._room != null)
    	this._room.draw();
    this._drawableList.draw();
}

Canvas.prototype._requestFullScreen = function(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || 
    	element.webkitRequestFullScreen || 
    	element.mozRequestFullScreen || 
    	element.msRequestFullscreen;
    
    if(requestMethod) // Native full screen.
        requestMethod.call(element);
    else if(window.ActiveXObject == undefined) { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if(wscript !== null)
            wscript.SendKeys("{F11}");
    }
}
