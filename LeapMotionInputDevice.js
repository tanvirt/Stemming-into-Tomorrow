function LeapMotionInputDevice() {
  if(arguments.length != 0) return;

  this._leapPoints = [];
  this._startLeapLoop();
}

LeapMotionInputDevice.prototype.getPoints = function() {
  return this._leapPoints;
}

LeapMotionInputDevice.prototype.resetLeapPoints = function() {
  this._leapPoints = [];
}

LeapMotionInputDevice.prototype._startLeapLoop = function() {
  var self = this;
  var options = { enableGestures: true };

  // runs at 60fps
  Leap.loop(options, function(frame) { self._onFrame(frame); });
}

LeapMotionInputDevice.prototype._onFrame = function(frame) {
  this.resetLeapPoints();
  if(frame.hands != null) {
    this._publishHandData(frame);
  }
  else {
    console.log("No hands available");
  }
}

LeapMotionInputDevice.prototype._publishHandData = function(frame) {
  var hand = frame.hands[0];
  if(hand == null) {
    console.log('No hands detected');
    return;
  }
  this._setHandPoints(hand);
}


LeapMotionInputDevice.prototype._setHandPoints = function(hand) {
  var currentFinger;
  for(var i = 0; i < hand.fingers.length; i++) {
    currentFinger = hand.fingers[i].bones;
    this._setFingerPoints(currentFinger);
  }
}

LeapMotionInputDevice.prototype._setFingerPoints = function(finger) {
  for(var j = 0; j < finger.length; j++) {
    this._setLeapPoints(finger[j].nextJoint);
    this._setLeapPoints(finger[j].prevJoint);
  }
}

LeapMotionInputDevice.prototype._setLeapPoints = function(XYZ) {
   this._leapPoints.push(0.0006130897+0.006277410*XYZ[0]);
   this._leapPoints.push(-0.350110952+0.0042503121*XYZ[1]);
   this._leapPoints.push(0.4993973239+0.0067629654*XYZ[2]);
}
