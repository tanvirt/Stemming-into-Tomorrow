function Point2d(x, y) {
	if(arguments.length != 2) return;
	this.x = x;
	this.y = y;
}

Point2d.prototype.setX = function(x) {
	this.x = x;
}

Point2d.prototype.setY = function(y) {
	this.y = y;
}

Point2d.prototype.getX = function() {
	return this.x;
}

Point2d.prototype.getY = function() {
	return this.y;
}
