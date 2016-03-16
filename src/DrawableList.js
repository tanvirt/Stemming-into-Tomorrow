function DrawableList() {
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
			graphic.draw();
	}
}
