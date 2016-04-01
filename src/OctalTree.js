function OctalTree() {
	this._root = new OctalTreeNode();
	this._drawableObjectMap = new AssociativeArray();
}

OctalTree.prototype.insert = function(drawableObject) {
	this._drawableObjectMap.put(drawable.getID(), drawableObject);
	//Add
}

OctalTree.prototype.remove = function(drawableObject) {
	
}

OctalTree.prototype.get = function(drawableObject) {
	//DO THIS
}

