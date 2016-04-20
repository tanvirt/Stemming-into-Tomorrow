function CollisionListener() {}
CollisionListener.prototype.onCollision = function(collidee) {}

function OctalTree(spaceWidth, spaceHeight, spaceDepth) {
	this._root = new OctalTreeNode(new BoundingBox(spaceWidth, spaceHeight, spaceDepth));
	this._spacialObjectMap = new AssociativeArray();
	
	this._movingObjects = [];
}

OctalTree.prototype.addMovingObject = function(drawableObject) {
	this._movingObjects.push(drawableObject);
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

OctalTree.prototype.getCollidees = function(boundingBox) {
	var collidees = [];

	for(var i = 0; i < this._movingObjects.length; i++) {
		var collideeBox = this._movingObjects[i].getBoundingBox();
		if(boundingBox.intersects(collideeBox))
			collidees.push(this._movingObjects[i]);
	}
	
	try {
		var collidee = this._root.getCollidee(boundingBox); // DEV: needs to be modified for multiple collisions
		collidees.push(collidee);
	}
	catch(error) {}

	return collidees;
}

var octree_global = new OctalTree(4, 3, 12);
