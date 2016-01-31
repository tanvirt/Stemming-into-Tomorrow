/*
      calling super methods in hand construction does not function properly.
*/

function Hand(Canvas) { 
    if(arguments.length < 1) return;
    DrawableObject.apply(this, arguments);
    this._handPoints = [];
    this._makeHand();
} Hand.prototype = new DrawableObject();

Hand.prototype.draw = function() {
    this._updateHandPoints();
    if(this._handPoints.length == 0)
    	return;
    this.graphic.updateShader();
    this.graphic.draw();
}

Hand.prototype._makeHand = function() {
    var lines = [];
    this._makeBase(lines);
    this._makeKnuckles(lines);
    this._makeWrist(lines);
    this.graphic.setLines(lines);
}

Hand.prototype._makeBase = function(lines) {
    for(var i = 39; i >= 0; i--)
        lines.push(i);
}

Hand.prototype._makeKnuckles = function(lines) {
    for(var i = 8; i < 32; i += 8) {
        lines.push(i);
        lines.push(i + 8);  
    }
}

Hand.prototype._makeWrist = function(lines) {
    for(var i = 1; i < 33; i += 8) {
        lines.push(i);
        lines.push(i + 8);
    }
}

Hand.prototype._updateHandPoints = function() {
    this._handPoints = this._canvas.getCurrentInputData();
    this.graphic.setXYZ(this._handPoints);
}
