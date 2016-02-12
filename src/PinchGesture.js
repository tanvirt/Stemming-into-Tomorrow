function PinchGesture() {
	Gesture.call(this, null);
	this.type = "pinch";
	this.position = null;
} PinchGesture.prototype = new Gesture();

Gesture.prototype.isOccurring = function(frame) {
	var hand = frame.hands[0];
	return hand != null && hand.pinchStrength > 0.9;
}

Gesture.prototype.updateProperties = function(frame) {
	var hand = frame.hands[0]
	this.position = this._getPinchCenter(hand);
}

Gesture.prototype.resetProperties = function() {
	this.position = null;
}

Gesture.prototype._getPinchCenter = function(hand) {
    var indexFinger = hand.fingers[1];
    var indexFingerTip = indexFinger.distal.nextJoint;
    
    var thumb = hand.fingers[0];
    var thumbTip = thumb.distal.nextJoint;
    
    var center = CanvasMath.getMidpoint(indexFingerTip, thumbTip);
    
    return CanvasMath.leapPointToGlPoint(center);
}
