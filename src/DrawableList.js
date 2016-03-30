function DrawableList(camera) {
	this._camera = camera;
	this._graphicList = [];
}

DrawableList.prototype.add = function(drawableObject) {
	this._graphicList[drawableObject.getId()] = drawableObject;
}

DrawableList.prototype.remove = function(drawableObject) {
	if(drawableObject.getId() in this._graphicList)
		delete this._graphicList[drawableObject.getId()];
}

DrawableList.prototype.getObject = function(objectId) {
	if(objectId in this._graphicList)
		return this._graphicList[objectId];
	else
		return null;
}

DrawableList.prototype.draw = function() {
	for(var key in this._graphicList) {
		if(!this._graphicList.hasOwnProperty(key))
			return;
		var graphic = this._graphicList[key];
		graphic.drawSetup();
		if(graphic.readyToDraw())
			this._drawGraphic(graphic);
	}
}

DrawableList.prototype._drawGraphic = function(graphic) {
	var camera = this._camera;
	camera.pushMatrix();
		camera.translate(graphic.getPosition());
		camera.rotate(graphic.getRotation()[0], [1, 0, 0]);
		camera.rotate(graphic.getRotation()[1], [0, 1, 0]);
		camera.rotate(graphic.getRotation()[2], [0, 0, 1]);
		camera.translate([
			-graphic.getPosition()[0], 
			-graphic.getPosition()[1], 
			-graphic.getPosition()[2]
		]);
		camera.scale(graphic.getScale());
		camera.translate(graphic.getPosition());
		graphic.updateShader();
		graphic.draw();
	camera.popMatrix();
}

DrawableList.prototype.acceptDrawableUpdate = function(DrawableObject) {
	//Maybe for events
}
