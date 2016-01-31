function CompositeDrawable (Canvas) {
	if(arguments < 1) { return; }
	DrawableObject.apply(this, arguments);
	this._drawableComponents = [];
	this._buffers = [];
	this._indices = []; 
} CompositeDrawable.prototype = new DrawableObject();

CompositeDrawable.prototype.add = function(drawableObject) {
	this._drawableComponents.push(drawableObject);
	this._getBuffers(drawableObject);
	this._setValues();
	//if(this._indices[0]["Lines"] == undefined) console.log('hello');
	//this.graphic.setXYZ(this._getXYZs());
	//TODO someShit --XYZs,lines,triangles,points,normals,UVs,colors
}

CompositeDrawable.prototype._getBuffers = function(drawableObject) {
	this._buffers.push(drawableObject.graphic.buffers);
	this._indices.push(drawableObject.graphic.indices);
}

CompositeDrawable.prototype._setValues = function() {
	this._setXYZs();
	//this._setPoints();
	//this._setTriangles();
	//this._setLines();
	//this._setNormals();
	//this._setUVs();
	//this._setColors();
}

CompositeDrawable.prototype._setXYZs = function() {
	var xyz = this._getXYZs();
	if(xyz.length != 0)
		this.graphic.setXYZ(xyz);
}

CompositeDrawable.prototype._getXYZs = function() {
	var xyz = [];
	for(var i = 0; i < this._buffers.length; i++)
		if(this._buffers[i]["aXYZ"] != undefined)
			Array.prototype.push.apply(xyz,this._buffers[i]["aXYZ"].data);
	
	return xyz;
}

CompositeDrawable.prototype._setTriangles = function() {
	
}

CompositeDrawable.prototype._getTriangles = function() {
	var triangles = [];
	for(var i = 0; i < this._indices.length; i++)
		if(this._indices[i]["Triangles"] != undefined)
			triangles.concat(this._indices[i]["Triangles"].data);
	
	return triangles;
}
//other methods elided

/*
	Composite should get all XYZs,triangles,lines,..whatever else from its components..
	User updates the the components and calls update or something on composite so the composite resets its data with the up to date stuff from its components.
*/