/*
	TODO future:
		removing objects from the drawable list --Memory management?????
*/

function DrawableList() {
	this._graphicList = [];
}

DrawableList.prototype.add = function(drawableObject) {
	this._graphicList.push(drawableObject);
}

DrawableList.prototype.draw = function() {
	for(var i = 0; i < this._graphicList.length; i++) {
		this._graphicList[i].drawSetup();
		if(this._graphicList[i].readyToDraw())
			this._graphicList[i].draw();
	}
}
