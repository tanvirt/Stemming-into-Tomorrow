/*
	TODO

	Canvas contains drawablelist and calls draw on it to draw entities (check). DrawableObjects add themselves to the Canvas which places the objects in the
	drawable list. DrawableObject holds the addToCanvas method, subclasses inherit. Users of our system have to call addToCanvas on the concrete drawableObject
	subclasses which fowards the request to the super (allows devs to choose when to draw objects). 

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

/*
	TODO: proper loading of graphics -- How are multiple graphics add?? Ordered???
*/

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
	for(var i = 0; i < this._graphicList.length; i++) {
		this._graphicList[i].draw();
	}
}
