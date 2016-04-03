function OctalTreeNode(boundingBox) {
	this._subSpaces = new AssociativeArray();
	this._spacialObjectBin = new AssociativeArray();
	this._boundingBox = boundingBox;
	this._initChildrenList();
}

OctalTreeNode.prototype._initChildrenList = function() {
	this._subSpaces.put("+++", "empty");
	this._subSpaces.put("++-", "empty");
	this._subSpaces.put("+-+", "empty");
	this._subSpaces.put("+--", "empty");
	this._subSpaces.put("-++", "empty");
	this._subSpaces.put("-+-", "empty");
	this._subSpaces.put("--+", "empty");
	this._subSpaces.put("---", "empty");
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
	//console.log("addToLimb");
	//console.log(this._subSpaces.values());
//	console.log(this._existsInBoundingBox(leaf));
//	console.log(this._hasSubspaces());
	if(this._existsInBoundingBox(leaf) && !this._hasSubspaces()) {
		//console.log("addToLocalBin");
		this._addToCurrentGraphicBin(leaf);
	}
	else if(this._existsInBoundingBox(leaf) && this._hasSubspaces()) {
		try {
			//console.log("dumpToSubSpace");
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
	var keySet = this._subSpaces.getKeys();
	for(var i in keySet) {
		var key = keySet[i];
		var value = this._subSpaces.get(key);
		try {
			value.addToLimb(leaf);
			foundSubSpace = true;
		}
		catch(error) {
			if(foundSubSpace) {
				//console.log("found Spot!");
				break;
			}
			else {
				console.log("ERORROROROROOROROR");
			}
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
	var keySet = this._subSpaces.getKeys();
	for(var i in keySet) {
		var key = keySet[i];
		var boundingBox = new BoundingBox(nodeHalfExtents[1], nodeHalfExtents[0], nodeHalfExtents[2]);
			if(key == "+++") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "++-") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], -nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "-+-") {
				boundingBox.setPosition([-nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], -nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "-++") {
				boundingBox.setPosition([-nodeHalfExtents[0]/2 + nodeCenter[0], nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "+-+") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], -nodeHalfExtents[1]/2 + nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "+--") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 + nodeCenter[0], -nodeHalfExtents[1]/2 + nodeCenter[1], -nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "---") {
				console.log("" + (nodeHalfExtents[0]/2 - nodeCenter[0]) + " " + (nodeHalfExtents[1]/2 - nodeCenter[1]) + " " + (nodeHalfExtents[2]/2 - nodeCenter[2]));
				boundingBox.setPosition([-nodeHalfExtents[0]/2 + nodeCenter[0], -nodeHalfExtents[1]/2 + nodeCenter[1], -nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else if(key == "--+") {
				boundingBox.setPosition([nodeHalfExtents[0]/2 - nodeCenter[0], nodeHalfExtents[1]/2 - nodeCenter[1], nodeHalfExtents[2]/2 + nodeCenter[2]]);
			}
			else {
				console.log("WHAAAAATTT??");
			}
			this._subSpaces.replace(key, new OctalTreeNode(boundingBox));
	}
}

//Current Issue... key value pair is not removed. The AssociativeArray class need to fixed so the remove function actually removes

OctalTreeNode.prototype._addLeavesToSubSpaces = function() {
	//console.log("addLeavesToSubSpaces");
	var nodeCenter = this._boundingBox.getPosition();
	var keySet = this._spacialObjectBin.getKeys();
	//console.log(nodeCenter);
//	console.log(keySet);
	for(var i in keySet) {
		var key = keySet[i];
		var value = this._spacialObjectBin.get(key);
//		console.log("i: " + i);
//		console.log("value: " + value);
		var boundingBox = value.getBoundingBox();
		var boundingBoxCenter = boundingBox.getPosition();
		//console.log(boundingBoxCenter);
		try {
			if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2] ) {
				//console.log("+++");
				this._spacialObjectBin.remove(key);
				this._subSpaces.get("+++").addToLimb(value);
			}
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
				//console.log("-++");
				this._spacialObjectBin.remove(key);
				//console.log("HELLLO " + this._subSpaces.get("-++"));
				this._subSpaces.get("-++").addToLimb(value);
			}
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
				//console.log("+-+");
				this._spacialObjectBin.remove(key);
				//console.log(this._subSpaces.get("+-+"));
				this._subSpaces.get("+-+").addToLimb(value);
			}
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
				//console.log("--+");
				this._spacialObjectBin.remove(key);
				this._subSpaces.get("--+").addToLimb(value);
			}
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
				//console.log("++-");
				this._spacialObjectBin.remove(key);
				this._subSpaces.get("++-").addToLimb(value);
				//console.log("value: " + value);
			}
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
				//console.log("-+-");
				this._spacialObjectBin.remove(key);
				this._subSpaces.get("-+-").addToLimb(value);
			}
			else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
				//console.log("+--");
				this._spacialObjectBin.remove(key);
				this._subSpaces.get("+--").addToLimb(value);
			}
			else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
				//console.log("---");
				//console.log(key);
				this._spacialObjectBin.remove(key);
				//console.log(this._spacialObjectBin);
				this._subSpaces.get("---").addToLimb(value);
			}
		}
		catch(error) {
			this._spacialObjectBin.put(value.getKey(), value);
		}
	}
}

OctalTreeNode.prototype._hasSubspaces = function() {
	var values = this._subSpaces.values();
	for(var i in values) {
		var value = values[i];
		if(value != "empty")
			return true;
	}
	return false;
}

OctalTreeNode.prototype._existsInBoundingBox = function(leaf) {
	//console.log(this._boundingBox.contains(leaf.getBoundingBox()));
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

OctalTreeNode.prototype.getCollidee = function(boundingBox) {
	//check my local bin
	//throw to right subspace if not in local bin
	
	if(this._localCollisionOccurred(boundingBox)) {
		var collidee = this._getLocalCollision(boundingBox);
		//console.log(collidee);
		return collidee;
	}
	else if(this._hasSubspaces())
		return this._dumpToChildren(boundingBox);
	else
		throw "No Collision Occurred";
}

OctalTreeNode.prototype._localCollisionOccurred = function(boundingBox) {
	var leaves = this._spacialObjectBin.values();
	for(var i in leaves) {
		var leafBoundingBox = leaves[i].getBoundingBox();
		if(boundingBox.intersects(leafBoundingBox))
			return true;
	}
	return false;
}

OctalTreeNode.prototype._getLocalCollision = function(boundingBox) {
	var leaves = this._spacialObjectBin.values();
	for(var i in leaves) {
		var leafBoundingBox = leaves[i].getBoundingBox();
		if(boundingBox.intersects(leafBoundingBox)) {
			var collidee = this._spacialObjectBin.get(leaves[i].getKey()).getData();
			//console.log(collidee);
			return collidee;
		}
	}
	throw "No Local Collision Found After Local Check Was True!";
}

OctalTreeNode.prototype._dumpToChildren = function(boundingBox) {
	var nodeCenter = this._boundingBox.getPosition();
	var boundingBoxCenter = boundingBox.getPosition();
	try {
		if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2] ) {
			var collidee = this._subSpaces.get("+++").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
			var collide = this._subSpaces.get("-++").getCollidee(boundingBox);
			//console.log(collide);
			return collidee;
		}
		else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
			var collidee = this._subSpaces.get("+-+").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] > nodeCenter[2]) {
			var collidee = this._subSpaces.get("--+").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
			var collidee = this._subSpaces.get("++-").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] > nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
			var collidee = this._subSpaces.get("-+-").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] > nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
			var collidee = this._subSpaces.get("+--").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
		else if(boundingBoxCenter[0] < nodeCenter[0] && boundingBoxCenter[1] < nodeCenter[1] && boundingBoxCenter[2] < nodeCenter[2]) {
			var collidee = this._subSpaces.get("---").getCollidee(boundingBox);
			//console.log(collidee);
			return collidee;
		}
	}
	catch(error) {
		throw error;
	}
}
