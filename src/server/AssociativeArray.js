function AssociativeArray() {
	this._associativeArray = [];
	this._size = 0;
}

AssociativeArray.prototype.put = function(key, value) {
	this._associativeArray[key] = value;
	this._size++;
}

AssociativeArray.prototype.putPrimativeAssociativeArray = function(associativeArray) {
	for(var key in associativeArray)
		this.put(key, associativeArray[key]);
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
		delete this._associativeArray[key];
		this._size--;
	}
}

AssociativeArray.prototype.initWithKeys = function(keyList) {
	for(var i in keyList) {
		this.put(keyList[i], "");
	}
}

AssociativeArray.prototype.size = function() {
	return size;
}


AssociativeArray.prototype.getKeys = function() {
	var keys = [];
	for(var key in this._associativeArray)
		if(this.containsKey(key))
			keys.push(key);
	return keys;
}

