function MovementDirector(canvas, game) {
	this._pinching = false;
	
	this._game = game;
	
	this._canvas = canvas;
	
	this._selectedObject = null;

}

MovementDirector.prototype.onGesture = function(gesture) {
	var gestureType = gesture.type;
	if(gestureType == "pinch")
		this._onPinch(gesture);
//	else if(gestureType == "circle")
//		this._onCircle(gesture);
	else if(gestureType == "keyTap")
		this._onKeyTap(gesture);
//	else if(gestureType == "screenTap")
//		this._onScreenTap(gesture);
//	else if(gestureType == "swipe")
//		this._onSwipe(gesture);
}

MovementDirector.prototype._onPinch = function(gesture) {
	var pinchCenter = gesture.position;
	this._pinching = true;
	if(gesture.state == "start") {
		var pixel = CanvasMath.getProjectedPixelPoint(this._canvas, pinchCenter);
		this._selectedObject = this._canvas.getObjectAt(pixel[0], pixel[1]);
	}
	else if(gesture.state == "update" && this._selectedObject != null) {
		this._selectedObject.setPosition(pinchCenter);
		this._game._alertServer(this._selectedObject.getId(), this._selectedObject.getPosition().toString());
		//alertSelectedObject().... this is needed for server stuff.. or something....Idk if this should be here
		
	}
	else if(gesture.state == "stop") {
		this._canvas.updatePickingMap();
		this._pinching = false;
		this._clearSelectedObject();
	}
}

MovementDirector.prototype._onKeyTap = function(gesture) {
	console.log("onKeyTap: [" + gesture.position + "]");
	if(gesture.state == "stop") {
		if(this._canvas.current_projector == this._canvas.projectors[0]) {
			this._canvas.useRedCyanProjector();
		}
		else if(this._canvas.current_projector == this._canvas.projectors[1]) {
			this._canvas.useRegularProjector();
		}
		else if(this._canvas.current_projector == this._canvas.projectors[3]) {
			this._canvas.useOculusProjector();
		}
	}
}

MovementDirector.prototype._clearSelectedObject = function() {
	this._selectedObject = null;
}