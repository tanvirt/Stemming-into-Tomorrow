function Hand(canvas) { 
    if(arguments.length < 1) return;
    DrawableObject.call(this, canvas);
    
    this._handPoints = [];
    this._makeHand();
} Hand.prototype = new DrawableObject();

Hand.prototype.drawSetup = function() {
    this._updateHandPoints();
    if(this._handPoints.length == 0)
    	return;
}

Hand.prototype._makeHand = function() {
    var lines = [];
    this._makeBase(lines);
    this._makeKnuckles(lines);
    this._makeWrist(lines);
    this.setLines(lines);
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
    this.setXYZ(this._handPoints);
}
