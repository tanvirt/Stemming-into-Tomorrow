//Point??? or center??? Capital for objects

function Cube(Canvas, Point, height) {
	if(arguments.length != 3) { return; }
	DrawableObject.apply(this, arguments);
	this._center = Point;
	this._height = height;
    this._makeCube();
} Cube.prototype = new DrawableObject();

Cube.prototype._makeCube = function() {
	this.graphic.setXYZ(this._generateXYZs());
	this.graphic.setTriangles(this._generateTriangles());
	this.graphic.setColors([1,0,0, 1,1,0, 1,0,1, 1,1,1, 0,0,0, 0,1,0, 0,0,1, 0,1,1]); 
}

Cube.prototype._generateXYZs = function() {
	var xyz = [ 
	    //Front Face starting from top left and going clockwise
		this._center.getX()-(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()+(this._height/2),  
		this._center.getX()+(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()+(this._height/2),
		this._center.getX()+(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()+(this._height/2),
		this._center.getX()-(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()+(this._height/2),
		
		//Rear Face starting from its top left and going clockwise --- As if you are looking at the 
		this._center.getX()+(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()-(this._height/2),
		this._center.getX()-(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()-(this._height/2),
		this._center.getX()-(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()-(this._height/2),
		this._center.getX()+(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()-(this._height/2)
	];

	return xyz;
}

Cube.prototype._generateTriangles = function() {
	var triangles = [
	    //Front Face, Right Face, Rear Face, Left Face, Top Face, Bottom Face --Each new line
		0,1,2, 2,3,0,
		1,4,7, 7,2,1,
		4,5,6, 6,7,4,
		5,0,3, 3,6,5,
		0,5,4, 4,1,0,
		2,7,6, 6,3,2
	];
	return triangles;
}

Cube.prototype.onDrag = function(event) {
	//TODO
}