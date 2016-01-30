function Point(X, Y, Z) {
	if(arguments.length != 3) return;
	this.x = X;
	this.y = Y;
	this.z = Z;
}

Point.prototype.setX = function(X) {
	this.x = X;
}

Point.prototype.setY = function(Y) {
	this.y = Y;
}

Point.prototype.setZ = function(Z) {
	this.z = Z;
}

Point.prototype.getX = function() {
	return this.x;
}

Point.prototype.getY = function() {
	return this.y;
}

Point.prototype.getZ = function() {
	return this.z;
}
