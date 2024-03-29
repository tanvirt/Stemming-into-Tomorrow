function AssociativeArray() {
	this._associativeArray = [];
	this._size = 0;
}

AssociativeArray.prototype.put = function(key, value) {
	this._associativeArray[key] = value;
	this._size++;
}

AssociativeArray.prototype.putPrimativeAssociativeArray = function(associativeArray) {
	for(var key in associativeArray) {
		this.put(key, associativeArray[key]);
		this._size++;
	}
}

AssociativeArray.prototype.putAll = function(associativeArray) {
	this._associativeArray = associativeArray;
	for(var key in associativeArray)
		this._size++;
}

AssociativeArray.prototype.replace = function(key, value) {
	if(this.containsKey(key))
		this._associativeArray[key] = value;
	else 
		console.log("Error: key " + key + " does not exist");
}

AssociativeArray.prototype.containsKey = function(key) {
	return (this._associativeArray.hasOwnProperty(key));
}

AssociativeArray.prototype.get = function(key) {
	if(this.containsKey(key))
		return this._associativeArray[key];
	else
		return null;
}

AssociativeArray.prototype.getAssociativeArray = function() {
	return this._associativeArray;
}

AssociativeArray.prototype.remove = function(key) {
	if(this.containsKey(key)) {
//		var keySet = this.getKeys();
//		for(var i in keySet) {
//			if(key == keySet[i])
//				this._associativeArray.splice
//		}
		//console.log(delete this._associativeArray[key]);
//		console.log(key);
		delete this._associativeArray[key];
		this._size--;
//		console.log(this._associativeArray[key]);
//		console.log(this._associativeArray);
	}
}

//Remove this and all dependencies
AssociativeArray.prototype.initWithKeys = function(keyList) {
	for(var i in keyList) {
		this.put(keyList[i], "empty");
	}
}

AssociativeArray.prototype.size = function() {
	return this._size;
}


AssociativeArray.prototype.getKeys = function() {
	var keys = [];
	for(var key in this._associativeArray)
		if(this.containsKey(key))
			keys.push(key);
	return keys;
}

AssociativeArray.prototype.values = function() {
	var values = [];
	for(var key in this._associativeArray)
		if(this.containsKey(key))
			values.push(this.get(key));
	return values;
}


//Remove this and all dependencies
AssociativeArray.prototype.isEmpty = function() {
	var values = this.values();
	for(var i in values) {
		var value = values[i];
		if(value != "empty")
			return false;
	}
	return true;
}
