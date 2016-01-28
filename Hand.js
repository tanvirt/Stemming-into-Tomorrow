/*
      calling super methods in hand construction does not function properly.
*/

function Hand(Canvas) {
	this._handPoints;
      DrawableObject.apply(this, arguments);
      /*
            Object methods are listed under the class definition
            Convention:
                  _classMethod --> indicates a private method that should not be used.
                  classMethod  --> indicates a public method that is part of the object interface.
      */
      this._makeHand();
} Hand.prototype = new DrawableObject();



Hand.prototype.draw = function() {
      this._updateHandPoints();
      this.graphic.updateShader();
      this.graphic.draw();
}

Hand.prototype._makeHand = function() {
      var lines = [];
      this._makeBase(lines)
      this._makeKnuckles(lines);
      this._makeWrist(lines);
      this.graphic.setLines(lines);
}

Hand.prototype._makeBase = function(lines) {
      for(var i = 39; i >= 0; i--) {
            lines.push(i);
      }
}

Hand.prototype._makeKnuckles = function(lines) {
      for(var i = 8; i < 32; i+=8) {
            lines.push(i);
            lines.push(i+8);  
      }
}

Hand.prototype._makeWrist = function(lines) {
      for(var i = 1; i<33; i+=8) {
            lines.push(i);
            lines.push(i+8);
      }
}

Hand.prototype._updateHandPoints = function() {
      this._handPoints = this._canvas.getCurrentInputData();
      this.graphic.setXYZ(this._handPoints);
}

