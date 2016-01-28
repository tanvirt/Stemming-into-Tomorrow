function LeapMotionInputDevice() {
  var self = this;
  this._leapPoints = [];

  var options = { enableGestures: true };

  //Main Leap loop 60fps
  Leap.loop(options, function(frame) {
    self.resetLeapPoints();
        if(frame.hands != null) {
          self._publishHandData(frame);
        }
        else {
          console.log("No hand Available");
        }
      });

} LeapMotionInputDevice.prototype= new WebGLObject(c);


/*
  Convention:

    _classMethod --> indicates a private method that should not be used.

    classMethod  --> indicates a public method that is part of the object interface.
*/

LeapMotionInputDevice.prototype.getPoints = function() {
  return this._leapPoints;
}

LeapMotionInputDevice.prototype.resetLeapPoints = function() {
  this._leapPoints = [];
}

LeapMotionInputDevice.prototype._publishHandData = function(frame) {
  var hand = frame.hands[0];
  if(hand == null){
    console.log('LeapMotion _publishHandData Error');
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

