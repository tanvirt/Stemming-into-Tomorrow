function Point3d(x, y, z) {
	if(arguments.length != 3) return;
	this.x = x;
	this.y = y;
	this.z = z;
}

Point3d.prototype.setX = function(x) {
	this.x = x;
}

Point3d.prototype.setY = function(y) {
	this.y = y;
}

Point3d.prototype.setZ = function(z) {
	this.z = z;
}

Point3d.prototype.getX = function() {
	return this.x;
}

Point3d.prototype.getY = function() {
	return this.y;
}

Point3d.prototype.getZ = function() {
	return this.z;
}
