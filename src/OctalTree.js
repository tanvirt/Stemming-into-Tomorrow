function OctalTree(spaceHeight, spaceWidth, spaceDepth) {
	this._root = new OctalTreeNode(new boundingBox(spaceHeight, spaceWidth, spaceDepth));
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

