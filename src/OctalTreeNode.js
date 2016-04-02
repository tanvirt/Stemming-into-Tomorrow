function OctalTreeNode(boundingBox) {
	this._subSpaces = new AssociativeArray();
	this._spacialObjectBin = new AssociativeArray();
	this._boundingBox = boundingBox;
	this._initChildrenList();
}

OctalTreeNode.prototype._initChildrenList = function() {
	this._subSpaces.initWithKeys(["+++", "++-", "+-+", "+--", "-++", "-+-", "--+", "---"]);
//	for(var key in this._subSpaces.getKeys()) {
//		this._subSpaces.put(key, "empty");
//	}
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
	
	//make switch state if all goes to hell
	for(var key in this._subSpaces.getKeys()) {
		var value = this._subSpaces.get(key);
		try {
			value.addToLimb(leaf);
			foundSubSpace = true;
		}
		catch(error) {
			if(foundSubSpace)
				break;
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
	else {
		this._setSubSpaces();
		this._addLeavesToSubSpaces();
		this.addToLimb(leaf);
	}
		//make subspaces and add leaves accordingly... including the one in this param
}

OctalTreeNode.prototype._setSubSpaces = function() {
	
	var nodeCenter = this._boundingBox.getPosition();
	var nodeHalfExtents = this._boundingBox.getHalfExtents();
	for(var key in this._subSpaces.getKeys()) {
		var boundingBox = new BoundingBox(nodeHalfExtents[1], nodeHalfExtents[0], nodeHalfExtents[2]);
			if(key == "+++") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "++-") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 - nodeCenter[2]]);
			}
			else if(key == "-+-") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 - nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 - nodeCenter[2]]);
			}
			else if(key == "-++") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 - nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "+-+") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 - nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "+--") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 - nodeCenter[1], nodeHalfExtents[2]/2 - nodeCenter[2]]);
			}
			else if(key == "---") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 - nodeCenter[0], nodeHalfExtents[1]/2 - nodeCenter[1], nodeHalfExtents[2]/2 - nodeCenter[2]]);
			}
			else if(key == "--+") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 - nodeCenter[0], nodeHalfExtents[1]/2 - nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else {
				console.log("WHAAAAATTT??");
			}
	}
}

OctalTreeNode.prototype._addLeavesToSubSpaces = function() {
	var nodeCenter = this._boundingBox.getPosition();
	for(var key in this._spacialObjectBin.getKeys()) {
		var value = this._spacialObjectBin.get(key);
		var boundingBox = value.getBoundingBox();
		var boundingBoxCenter = boundingBox.getPosition();
		try {
			if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2] )
				this._subSpaces.get("+++").addToLimb(value);
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2])
				this._subSpaces.get("-++").addToLimb(value);
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2])
				this._subSpaces.get("+-+").addToLimb(value);
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2])
				this._subSpaces.get("--+").addToLimb(value);
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2])
				this._subSpaces.get("++-").addToLimb(value);
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2])
				this._subSpaces.get("-+-").addToLimb(value);
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2])
				this._subSpaces.get("+--").addToLimb(value);
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2])
				this._subSpaces.get("--").addToLimb(value);
		}
		catch(error) {
			this._spacialObjectBin.put(value.getKey(), value);
		}
	}
}

OctalTreeNode.prototype._hasNoSubspaces = function() {
	return this._subSpaces.isEmpty();
}

OctalTreeNode.prototype._existsInBoundingBox = function(leaf) {
	return this._boundingBox.contains(leaf.getBoundingBox());
}

OctalTreeNode.prototype.add = function(quadrant, octalTreeNode) {
	this._subSpaces.replace(quadrant, treeNode); // Maybe no good
}

OctalTreeNode.prototype.remove = function(quadrant) {
	this._subSpaces.replace(quadrant, "empty");
}

OctalTreeNode.prototype.addLeaf = function(leaf) {
	this._spacialObjectBin.put(leaf.getKey(), leaf);
}

OctalTreeNode.prototype.getLeaf = function(leaf) {
	return this._spacialObjectBin.get(leaf.getKey());
}