function LeapMotionInputDevice() {
    this._leapPoints = [];
    this._gestureListeners = [];

    this._pinchGesture = new PinchGesture();
    
    this._startLeapLoop();
}

LeapMotionInputDevice.prototype.getPoints = function() { return this._leapPoints; }

LeapMotionInputDevice.prototype.resetLeapPoints = function() {
    this._leapPoints = [];
}

LeapMotionInputDevice.prototype.addGestureListener = function(GestureListener) {
    this._gestureListeners.push(GestureListener);
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
    this._updatePinchGesture(frame);
    
    var gestures = frame.gestures;
    if(gestures.length > 0)
    	for(var i = 0; i < gestures.length; i++)
    		this._notifyForGesture(gestures[i]);
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
    var glXYZ = this._getGlXYZ(leapXYZ);
    this._leapPoints.push(glXYZ[0]);
    this._leapPoints.push(glXYZ[1]);
    this._leapPoints.push(glXYZ[2]);
}

LeapMotionInputDevice.prototype._updatePinchGesture = function(frame) {
	if(this._pinchGesture.state == 'stop')
		this._pinchGesture = new PinchGesture();
	
	var hand = frame.hands[0];
    if(this._isPinching(hand)) {
    	if(this._pinchGesture.state == null)
    		this._pinchGesture.state = 'start';
    	else if(this._pinchGesture.state == 'start')
    		this._pinchGesture.state = 'update';
    	this._pinchGesture.position = this._getPinchCenter(hand);
        frame.gestures.push(this._pinchGesture);
    }
    else if(this._pinchGesture.state != null)
    	this._pinchGesture.state = 'stop';
}

LeapMotionInputDevice.prototype._isPinching = function(hand) {
    return hand != null && hand.pinchStrength > 0.9;
}

LeapMotionInputDevice.prototype._getPinchCenter = function(hand) {
    var indexFinger = hand.fingers[1];
    var indexFingerTip = indexFinger.distal.nextJoint;
    
    var thumb = hand.fingers[0];
    var thumbTip = thumb.distal.nextJoint;

    var center = this._getCenter(indexFingerTip, thumbTip);

    return this._getGlXYZ(center);
}

LeapMotionInputDevice.prototype._getCenter = function(point1, point2) {
    var center = [];
    for(var i = 0; i < 3; i++)
        center.push((point1[i] + point2[i])/2);

    return center;
}

LeapMotionInputDevice.prototype._getGlXYZ = function(leapXYZ) {
    var glXYZ = [];
    glXYZ[0] = 0.0006130897+0.006277410*leapXYZ[0];
    glXYZ[1] = -0.350110952+0.0042503121*leapXYZ[1];
    glXYZ[2] = 0.4993973239+0.0067629654*leapXYZ[2];
    
    return glXYZ;
}

LeapMotionInputDevice.prototype._notifyForGesture = function(gesture) {
	var gestureType = gesture.type;
	if(gestureType == 'pinch')
		this._notifyForPinching(gesture);
	else if(gestureType == 'circle')
		this._notifyForCircling(gesture);
	else if(gestureType == 'keyTap')
		this._notifyForKeyTapping(gesture);
	else if(gestureType == 'screenTap')
		this._notifyForScreenTapping(gesture);
	else if(gestureType == 'swipe')
		this._notifyForSwiping(gesture);
}

LeapMotionInputDevice.prototype._notifyForPinching = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
        this._gestureListeners[i].onPinch(gesture);
}

LeapMotionInputDevice.prototype._notifyForCircling = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
        this._gestureListeners[i].onCircle(gesture);
}

LeapMotionInputDevice.prototype._notifyForKeyTapping = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
		this._gestureListeners[i].onKeyTap(gesture);
}

LeapMotionInputDevice.prototype._notifyForScreenTapping = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
		this._gestureListeners[i].onScreenTap(gesture);
}

LeapMotionInputDevice.prototype._notifyForSwiping = function(gesture) {
	for(var i = 0; i < this._gestureListeners.length; i++)
		this._gestureListeners[i].onSwipe(gesture);
}
