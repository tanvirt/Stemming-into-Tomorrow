function Canvas(InputDevice) {
   this._inputDevice = InputDevice;
   this._hand = new Hand(self);
   this._drawableList = new DrawableList();
   var self = this;

   c.onSetup = function() {
      c.setBackgroundColor(0,0,0);
      c.setLoadingStatus(false);

   }
   c.onDraw = function() {
      var gl=c.getGL();
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if(self.getCurrentInputData().length != 0) {
         self._drawableList.draw();
      }
   }

   c.start();
}

/*
   Convention:

      _classMethod --> indicates a private method that should not be used.

      classMethod  --> indicates a public method that is part of the object interface.
*/


Canvas.prototype.addDrawableObject = function(drawableObject) {
   this._drawableList.add(drawableObject);
}

Canvas.prototype.getCurrentInputData = function() {
   return this._inputDevice.getPoints();
}