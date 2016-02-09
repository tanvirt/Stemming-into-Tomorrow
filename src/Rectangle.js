function Rectangle(canvas, centerXYZ, height, width, depth) {
	if(arguments < 3) return;
	DrawableObject.call(this, canvas);
	
	this.disablePicking(false);
	
	this._center = centerXYZ;
	this._height = height;
	this._width = width;
	this._depth = depth;
	
	if(this._width == undefined)
		this._width = height;
	if(this._depth == undefined)
		this._depth = height;
	
	this._makeRectangle();
} Rectangle.prototype = new DrawableObject();

Rectangle.prototype._makeRectangle = function() {
	this.setXYZ(this._generateXYZs());
	this.setTriangles(this._generateTriangles());
	this.setColors([1,0,0, 1,1,0, 1,0,1, 1,1,1, 0,0,0, 0,1,0, 0,0,1, 0,1,1]);
	this._readyToDraw = true;
}

Rectangle.prototype._generateXYZs = function() {
	var xyz = [ 
	    //Front Face starting from top left and going clockwise
		this._center[0]-(this._width/2), this._center[1]+(this._height/2), this._center[2]+(this._depth/2),  
		this._center[0]+(this._width/2), this._center[1]+(this._height/2), this._center[2]+(this._depth/2),
		this._center[0]+(this._width/2), this._center[1]-(this._height/2), this._center[2]+(this._depth/2),
		this._center[0]-(this._width/2), this._center[1]-(this._height/2), this._center[2]+(this._depth/2),
		
		//Rear Face starting from its top left and going clockwise --- As if you are looking at the 
		this._center[0]+(this._width/2), this._center[1]+(this._height/2), this._center[2]-(this._depth/2),
		this._center[0]-(this._width/2), this._center[1]+(this._height/2), this._center[2]-(this._depth/2),
		this._center[0]-(this._width/2), this._center[1]-(this._height/2), this._center[2]-(this._depth/2),
		this._center[0]+(this._width/2), this._center[1]-(this._height/2), this._center[2]-(this._depth/2)
	];
	return xyz;
}

Rectangle.prototype._generateTriangles = function() {
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

Rectangle.prototype.onDrag = function(event) {
	//TODO
}
