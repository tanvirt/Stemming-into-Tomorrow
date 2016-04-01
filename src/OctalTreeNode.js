function OctalTreeNode(drawableObject) {
	this._children = new AssociativeArray();
	this._drawableObject = null;
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

OctalTreeNode.prototype.add = function(quadrant, octalTreeNode) {
	this._children.replace(quadrant, treeNode); // Maybe no good
}

OctalTreeNode.prototype.remove = function(quadrant) {
	this._children.replace(quadrant, "Empty");
}

//TreeNode.prototype.setDrawable = function(drawableObject) {
//	this._drawableObject = drawableObject;
//}
//
//TreeNode.prototype.getDrawable = function() {
//	return this._drawableObject;
//}