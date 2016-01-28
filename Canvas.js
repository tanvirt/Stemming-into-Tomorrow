function Canvas(elementId, InputDevice) {
    if(arguments.length != 2) return;

    var self = this;

    this._webGLCanvas = new WebGLCanvas(elementId);
    this._inputDevice = InputDevice;
    this._drawableList = new DrawableList();

    this._webGLCanvas.onSetup = function() {
        self._webGLCanvas.setBackgroundColor(0, 0, 0);
        self._webGLCanvas.setLoadingStatus(false);
    }

    this._webGLCanvas.onDraw = function() {
        var gl = self._webGLCanvas.getGL();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if(self.getCurrentInputData().length != 0) {
            self._drawableList.draw();
        }
    }

    this._webGLCanvas.start();
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
