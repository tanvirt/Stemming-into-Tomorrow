function Leaf(data) {
	this._data = data;
	this._boundingBox = this._data.getBoundingBox();
	this._key = this.generateUniqueString(50);
}

Leaf.prototype.getKey = function() {
	return this._key;
}

Leaf.prototype._generateUniqueString = function(length) {
	var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array(length).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
}

Leaf.prototype.getBoundingBox = function() {
	return this._boundingBox;
}