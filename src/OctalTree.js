function OctalTree(spaceHeight, spaceWidth, spaceDepth) {
	this._root = new OctalTreeNode(new BoundingBox(spaceHeight, spaceWidth, spaceDepth));
	this._spacialObjectMap = new AssociativeArray();
}

OctalTree.prototype.insert = function(leaf) {
	this._spacialObjectMap.put(leaf.getKey(), leaf);
	this._root.addToLimb(leaf);
}

OctalTree.prototype.remove = function(leaf) {
	this._spacialObjectMap.remove(leaf.getKey());
}

OctalTree.prototype.get = function(leaf) {
	return this._spacialObjectMap.get(leaf.getKey());
}

OctalTree.prototype.getCollidee = function(boundingBox) {
	try {
		
		var collidee = this._root.getCollidee(boundingBox);
		//console.log(collidee);
		return collidee;
	}
	catch(error) {
		throw error;
	}
}