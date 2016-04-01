function OctalTreeNode(boundingBox) {
	this._subSpaces = new AssociativeArray();
	this._spacialObjectBin = new AssociativeArray();
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
	return this._subSpaces;
}

OctalTreeNode.prototype.addToLimb = function(leaf) {
	if(this._existsInBoundingBox(leaf) && this._hasNoSubspaces()) {
		this._addToCurrentGraphicBin(leaf);
	}
	else if(this._existsInBoundingBox(leaf) && !this._hasNoSubspaces()) {
		try {
			this._addToSubSpace(leaf);
		}
		catch(error) {
			this._addToCurrentGraphicBin(leaf);
		}
	}
	else if(!this._existsInBoundingBox(leaf)) {
		throw "Doesn't Exist In SubSpace!";
	}
		
}


OctalTreeNode.prototype._addToSubSpace = function(leaf) {
	var foundSubSpace = false;
	for(var i = 1; i < 9; i++){
		var value = this._subSpaces.get(i);
		try {
			value.addToLimb(leaf);
			foundSubSpace = true;
		}
		catch(error) {
			if(!foundSubSpace)
				continue;
		}
	}
	
	if(!foundSubSpace)
		throw "Doesn't Exist in Single SubSpace!";
	
	//for each for associativeArray
	//catch errors and set var as false accordingly --filter all error throws from no fit nodes
	//if false at end throw error that it wasn't placed
}

OctalTreeNode.prototype._addToCurrentGraphicBin = function(leaf) {
	if(this._spacialObjectBin.size() < 8)
		this._spacialObjectBin.put(leaf.getKey(), leaf);
	else
		//make subspaces and add leaves accordingly... including the one in this param
}

OctalTreeNode.prototype._hasNoSubspaces = function() {
	//iterate through spaces... find if there are none
}

OctalTreeNode.prototype._existsInBoundingBox = function(lead) {
	return this._boundingBox.contains(leaf.getBoundingBox());
}

OctalTreeNode.prototype.add = function(quadrant, octalTreeNode) {
	this._subSpaces.replace(quadrant, treeNode); // Maybe no good
}

OctalTreeNode.prototype.remove = function(quadrant) {
	this._subSpaces.replace(quadrant, "Empty");
}

OctalTreeNode.prototype.addLeaf = function(leaf) {
	this._spacialObjectBin.put(leaf.getKey(), leaf);
}

OctalTreeNode.prototype.getLeaf = function(leaf) {
	return this._spacialObjectBin.get(leaf.getKey());
}