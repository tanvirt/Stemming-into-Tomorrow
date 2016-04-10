function TreeNode(drawableObject) {
	this._children = new AssociativeArray();
	this._leaf = new Leaf();
	this._initChildrenList();
}

TreeNode.prototype._initChildrenList = function() {
	this._children.initWithKeys([1, 2, 3, 4, 5, 6, 7, 8]);
}

TreeNode.prototype.setChildren = function(associativeArray) {
	if(associativeArray instanceof Array)
		this._children.putPrimativeAssociativeArray(associativeArray);
	else
		this._children.putAll(associativeArray);
}

TreeNode.prototype.getChildren = function() {
	return this._children;
}

TreeNode.prototype.add = function(quadrant, treeNode) {
	this._children.replace(quadrant, treeNode); // Maybe no good
}

TreeNode.prototype.remove = function(spot) {
	this._children.replace(spot, "Empty");
}

TreeNode.prototype.addLeaf = function(leaf) {
	this._leaf = leaf;
}

TreeNode.prototype.getLeaf = function() {
	return this._leaf;
}

//TreeNode.prototype.setDrawable = function(drawableObject) {
//	this._drawableObject = drawableObject;
//}
//
//TreeNode.prototype.getDrawable = function() {
//	return this._drawableObject;
//}