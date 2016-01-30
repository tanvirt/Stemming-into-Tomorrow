/*
	TODO future:
		removing objects from the drawable list --Memory management?????
*/

function DrawableList() {
	if(arguments.length != 0) return;
	
	this._graphicList = [];
}

DrawableList.prototype.add = function(drawableObject) {
	this._graphicList.push(drawableObject);
}

DrawableList.prototype.getDrawable = function() {
	return this._graphicList[0];
}

DrawableList.prototype.setDrawableList = function(graphicList) {
	this._graphicList = graphicList;
}

DrawableList.prototype.getDrawableList = function() {
	return this._graphicList;
}

DrawableList.prototype.resetDrawableList = function() {
	this._graphicList = [];
}

DrawableList.prototype.draw = function() {
	for(var i = 0; i < this._graphicList.length; i++)
		this._graphicList[i].draw();
}
