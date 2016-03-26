function Rectangle(canvas, centerXYZ, height, width, depth) {
	if(arguments.length < 3) return;
	DrawableObject.call(this, canvas);
	
	this.setCenter(centerXYZ);
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
	this.setTexture(new WebGLTexture(this._canvas));
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

Rectangle.prototype.enableShading = function() {
	this.setNormals(this._generateNormals());
}

Rectangle.prototype._generateXYZs = function() {
	var centerX = this.getCenter()[0];
	var centerY = this.getCenter()[1];
	var centerZ = this.getCenter()[2];
	
	var halfWidth = this._width/2;
	var halfHeight = this._height/2;
	var halfDepth = this._depth/2;
	
	var xyz = [
	    // back face
		centerX - halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX - halfWidth, centerY - halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ + halfDepth,
		
		// front face
		centerX - halfWidth, centerY + halfHeight, centerZ - halfDepth,
		centerX + halfWidth, centerY + halfHeight, centerZ - halfDepth,
		centerX - halfWidth, centerY - halfHeight, centerZ - halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ - halfDepth,
		
		// right face
		centerX + halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY + halfHeight, centerZ - halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ - halfDepth,
		
		// left face
		centerX - halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX - halfWidth, centerY - halfHeight, centerZ + halfDepth,
		centerX - halfWidth, centerY + halfHeight, centerZ - halfDepth,
		centerX - halfWidth, centerY - halfHeight, centerZ - halfDepth,
	
		// top face
		centerX - halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY + halfHeight, centerZ + halfDepth,
		centerX - halfWidth, centerY + halfHeight, centerZ - halfDepth,
		centerX + halfWidth, centerY + halfHeight, centerZ - halfDepth,
		
		// bottom face
		centerX - halfWidth, centerY - halfHeight, centerZ + halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ + halfDepth,
		centerX - halfWidth, centerY - halfHeight, centerZ - halfDepth,
		centerX + halfWidth, centerY - halfHeight, centerZ - halfDepth
	];
	
	return xyz;
}

Rectangle.prototype._generateTriangles = function() {
	var triangles = [
	    // back face
    	0,2,1,		1,2,3, 
    	
    	// front face
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
		// back face
    	0,1, 1,1, 0,0, 1,0, 
    	
    	// front face
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
		// back face
		0,0,1, 0,0,1, 0,0,1, 0,0,1, 
		
		// front face
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
