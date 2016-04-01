function OctalTreeNode(boundingBox) {
	this._children = new AssociativeArray();
	this._leaf = null;
	this._boundingBox = boundingBox;
	this._initChildrenList();
}

OctalTreeNode.prototype._initChildrenList = function() {
	this._children.initWithKeys([1, 2, 3, 4, 5, 6, 7, 8]);
}

OctalTreeNode.prototype.setChildren = function(associativeArray) {
	if(associativeArray instanceof Array)
		this._children.putPrimativeAssociativeArray(associativeArray);
	else
		this._children.putAll(associativeArray);
}

OctalTreeNode.prototype.getChildren = function() {
	return this._children;
}

OctalTreeNode.prototype.addToLimb = function(leaf) {
	//Setting Logic here...
}

OctalTreeNode.prototype.add = function(quadrant, octalTreeNode) {
	this._children.replace(quadrant, treeNode); // Maybe no good
}

OctalTreeNode.prototype.remove = function(quadrant) {
	this._children.replace(quadrant, "Empty");
}

OctalTreeNode.prototype.makeLeaf = function(leaf) {
	this._leaf = leaf;
}

OctalTreeNode.prototype.getLeaf = function() {
	return this._leaf;
}