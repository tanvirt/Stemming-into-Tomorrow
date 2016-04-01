function LeapMotionInputDevice() {
    this._leapPoints = [];
    this._customGestures = [];
    this._gestureListeners = [];
    
    this._addCustomGestures();
    
    this._startLeapLoop();
}

LeapMotionInputDevice.prototype.getPoints = function() { return this._leapPoints; }

LeapMotionInputDevice.prototype.resetLeapPoints = function() {
    this._leapPoints = [];
}

LeapMotionInputDevice.prototype.addGestureListener = function(gestureListener) {
    this._gestureListeners.push(gestureListener);
}

LeapMotionInputDevice.prototype.addCustomGesture = function(gesture) {
	this._customGestures.push(gesture);
}

LeapMotionInputDevice.prototype._addCustomGestures = function() {
	this.addCustomGesture(new PinchGesture());
}

LeapMotionInputDevice.prototype._startLeapLoop = function() {
    var self = this;
    var options = { enableGestures: true };
    
    // Runs at approximately 60 frames per second.
    Leap.loop(options, function(frame) { self._onFrame(frame); });
}

LeapMotionInputDevice.prototype._onFrame = function(frame) {
    this.resetLeapPoints();
    if(!frame.valid || frame.hands == null)
    	return;
    this._publishHandData(frame);
    
    this._updateCustomGestures(frame);
    var gestures = frame.gestures;
    if(gestures.length > 0)
    	for(var i = 0; i < gestures.length; i++)
    		this._notifyGestureListeners(gestures[i]);
}

LeapMotionInputDevice.prototype._notifyGestureListeners = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
		this._gestureListeners[i].onGesture(gesture);
}

LeapMotionInputDevice.prototype._publishHandData = function(frame) {
    var hand = frame.hands[0];
    if(hand == null)
        return;
    this._setHandPoints(hand);
}

LeapMotionInputDevice.prototype._setHandPoints = function(hand) {
    for(var i = 0; i < hand.fingers.length; i++) {
        var currentFinger = hand.fingers[i].bones;
        this._setFingerPoints(currentFinger);
    }
}

LeapMotionInputDevice.prototype._setFingerPoints = function(finger) {
    for(var j = 0; j < finger.length; j++) {
        this._setLeapPoints(finger[j].nextJoint);
        this._setLeapPoints(finger[j].prevJoint);
    }
}

LeapMotionInputDevice.prototype._setLeapPoints = function(leapXYZ) {
    var glXYZ = CanvasMath.leapPointToGlPoint(leapXYZ);
    this._leapPoints.push(glXYZ[0]);
    this._leapPoints.push(glXYZ[1]);
    this._leapPoints.push(glXYZ[2]);
}

LeapMotionInputDevice.prototype._updateCustomGestures = function(frame) {
	for(var i = 0; i < this._customGestures.length; i++) {
		var gesture = this._customGestures[i];
		this._updateCustomGesture(frame, gesture);
	}
}

LeapMotionInputDevice.prototype._updateCustomGesture = function(frame, gesture) {
	if(gesture.state == "stop")
		gesture.reset();
	if(gesture.isOccurring(frame)) {
		if(gesture.state == null)
			gesture.state = "start";
    	else if(gesture.state == "start")
    		gesture.state = "update";
		gesture.updateProperties(frame);
        frame.gestures.push(gesture);
	}
	else if(gesture.state != null) {
		gesture.state = "stop";
		frame.gestures.push(gesture);
	}
}
