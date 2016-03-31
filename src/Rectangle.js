function Rectangle(canvas, height, width, depth) {
	if(arguments.length < 2) return;
	DrawableObject.call(this, canvas);
	
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
	this.setColor(1, 1, 1);
	this.setUV(this._generateUVs());
	this.setNormals(this._generateNormals());
	this.setTexture(new GLTexture(this._canvas));
}

Rectangle.prototype.setColor = function(red, green, blue) {
	var colors = [];
	for(var i = 0; i < 24; i++) {
		colors.push(red);
		colors.push(green);
		colors.push(blue);
	}
	this.setColors(colors);
}

Rectangle.prototype._generateXYZs = function() {
	var halfWidth = this._width/2;
	var halfHeight = this._height/2;
	var halfDepth = this._depth/2;
	
	var xyz = [
   	    // front face
   		-halfWidth, halfHeight, halfDepth,
   		halfWidth, halfHeight, halfDepth,
   		-halfWidth, -halfHeight, halfDepth,
   		halfWidth, -halfHeight, halfDepth,
   		
   		// back face
   		-halfWidth, halfHeight, -halfDepth,
   		halfWidth, halfHeight, -halfDepth,
   		-halfWidth, -halfHeight, -halfDepth,
   		halfWidth, -halfHeight, -halfDepth,
   		
   		// right face
   		halfWidth, halfHeight, halfDepth,
   		halfWidth, -halfHeight, halfDepth,
   		halfWidth, halfHeight, -halfDepth,
   		halfWidth, -halfHeight, -halfDepth,
   		
   		// left face
   		-halfWidth, halfHeight, halfDepth,
   		-halfWidth, -halfHeight, halfDepth,
   		-halfWidth, halfHeight, -halfDepth,
   		-halfWidth, -halfHeight, -halfDepth,
   	
   		// top face
   		-halfWidth, halfHeight, halfDepth,
   		halfWidth, halfHeight, halfDepth,
   		-halfWidth, halfHeight, -halfDepth,
   		halfWidth, halfHeight, -halfDepth,
   		
   		// bottom face
   		-halfWidth, -halfHeight, halfDepth,
   		halfWidth, -halfHeight, halfDepth,
   		-halfWidth, -halfHeight, -halfDepth,
   		halfWidth, -halfHeight, -halfDepth
   	];
	
	return xyz;
}

Rectangle.prototype._generateTriangles = function() {
	var triangles = [
	    // front face
    	0,2,1,		1,2,3, 
    	
    	// back face
    	4,5,6,		6,5,7, 
    	
    	// right face
    	9,11,8,		8,11,10, 
    	
    	// left face
    	13,12,15, 	15,12,14, 
    	
    	// top face
    	16,17,18, 	18,17,19, 
    	
    	// bottom face
    	21,20,22,	21,22,23
    ];
	
	return triangles;
}

Rectangle.prototype._generateUVs = function() {
	var uv = [
		// front face
    	0,1, 1,1, 0,0, 1,0, 
    	
    	// back face
    	1,1, 0,1, 1,0, 0,0, 
    	
    	// right face
    	0,1, 0,0, 1,1, 1,0, 
    	
    	// left face
    	1,1, 1,0, 0,1, 0,0, 
    	
    	// top face
    	0,0, 1,0, 0,1, 1,1, 
    	
    	// bottom face
    	1,0, 0,0, 1,1, 0,1
    ];
	
	return uv;
}

Rectangle.prototype._generateNormals = function() {
	var normals = [
		// front face
		0,0,1, 0,0,1, 0,0,1, 0,0,1, 
		
		// back face
		0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, 
		
		// right face
		1,0,0, 1,0,0, 1,0,0, 1,0,0, 
		
		// left face
		-1,0,0, -1,0,0, -1,0,0, -1,0,0, 
		
		// top face
		0,1,0, 0,1,0, 0,1,0, 0,1,0, 
		
		// bottom face
		0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0
	];
	
	return normals;
}
