function Canvas(elementId, InputDevice) {
    if(arguments.length != 2) return;

    var self = this;

    this._webGLCanvas = new WebGLCanvas(elementId);
    this._inputDevice = InputDevice;
    this._drawableList = new DrawableList();

    this._start();
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
    this._drawableList.draw();
}
