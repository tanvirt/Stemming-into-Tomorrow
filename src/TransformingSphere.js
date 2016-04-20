function TransformingSphere(canvas, text) {
	if(arguments.length < 2) return;
	DrawableObject.call(this, canvas);

	this._text = text;
	this._createSphere();
} TransformingSphere.prototype = new DrawableObject();

TransformingSphere.prototype.transform = function() {
	if(this.t >= 1) //if it is flat
		this.dir = -1;
	else if(this.t <= 0) //if it is sphere
		this.dir = 1;
}

TransformingSphere.prototype.drawSetup = function() {
	if(this.dir != 0) {	
		this.t += this.dir*0.01;
		if(this.t > 1 || this.t < 0) 
			this.dir = 0;
		this.setXYZ(this._createXYZ(35, this.t));//update locations
		this.setNormals(this._createNormals(35, this.t));//update orientations
	}
}

TransformingSphere.prototype._createXYZ = function(res, t) {
	var xyz = new Float32Array(3*res*res);
	var c1 = 0;
	for(var i = 0; i < res; i++) {
		for(var j = 0; j < res; j++) {
			xyz[c1] = Math.cos(3.1416*(1-t)*(j/(res-1)-0.5))*Math.cos((1-t)*(2*3.1416*i/(res-1)-3.1415/2))*(1-t)+2*2*(4/3)*(-i/(res-1)+0.5)*t;
			c1 += 1;
			xyz[c1] = Math.sin(3.1416*(1-t)*(j/(res-1)-0.5))*(1-t)+2*2*(j/(res-1)-0.5)*t ;
			c1 += 1;
			xyz[c1] = Math.cos(3.1416*(1-t)*(j/(res-1)-0.5))*Math.sin((1-t)*(2*3.1416*i/(res-1)-3.1415/2))*(1-t)+0*t;
			c1 += 1;
		}
	}
	return xyz;
}

TransformingSphere.prototype._createNormals = function(res, t) {
	var nrm = new Float32Array(3*res*res);
	var c1 = 0;
	for(var i = 0; i < res; i++) {
		for(var j = 0; j < res; j++) {
			nrm[c1] = Math.cos(3.1416*(1-t)*(j/(res-1)-0.5))*Math.cos((1-t)*(2*3.1416*i/(res-1)-3.1415/2))*(1-t)+0*t;
			c1 += 1;
			nrm[c1] = Math.sin(3.1416*(1-t)*(j/(res-1)-0.5))*(1-t)+0*t;
			c1 += 1;
			nrm[c1] = Math.cos(3.1416*(1-t)*(j/(res-1)-0.5))*Math.sin((1-t)*(2*3.1416*i/(res-1)-3.1415/2))*(1-t)+1*t;
			c1 += 1;
		}
	}
	return nrm;
}

TransformingSphere.prototype._createSphere = function() {
	var mat = new GLMaterial(this._canvas);
	mat.setMatCap("../data/textures/white.png");
	mat.setMatCapColor([1, 1, 1]);

	var res=35;
	var rad_xz=1;
	var rad_y=1;
	var xyz=new Float32Array(3*res*res);
	var nrm=new Float32Array(3*res*res);
	var uv=new Float32Array(2*res*res);
	var tri=new Int16Array(6*(res-1)*(res-1));
	var c1=0;
	var c2=0;
	var c3=0;
	var c4=0;
	for(var i=0; i<res; i++) {
		for(var j=0; j<res; j++) {
			xyz[c1]=rad_xz*Math.cos(3.1416*(j/(res-1)-0.5))*Math.cos(2*3.1416*i/(res-1));
			nrm[c1]=xyz[c1];
			c1+=1;

			xyz[c1]=rad_y*Math.sin(3.1416*(j/(res-1)-0.5));
			nrm[c1]=xyz[c1];
			c1+=1;

			xyz[c1]=rad_xz*Math.cos(3.1416*(j/(res-1)-0.5))*Math.sin(2*3.1416*i/(res-1));
			nrm[c1]=xyz[c1];
			c1+=1;
			
			uv[c2]=i/(res-1);
			c2+=1;

			uv[c2]=j/(res-1);
			c2+=1;

			if(i<res-1 && j<res-1) {
				tri[c3]=c4;c3+=1;tri[c3]=c4+1;c3+=1;tri[c3]=c4+res;c3+=1;
				tri[c3]=c4+1;c3+=1;tri[c3]=c4+res+1;c3+=1;tri[c3]=c4+res;c3+=1;
			}
			c4+=1;
		}
	}
	
	this.setXYZ(this._createXYZ(35, 0));
	this.setNormals(this._createNormals(35, 0));
	this.setTriangles(tri);
	this.setUV(uv);
	this.setTexture(this._createWhiteText(this._text, 150).getTexture());
	this.setMaterial(mat);
	this.dir=0;
	this.t=0;

	this.rotate(0, Math.PI, 0);
}

TransformingSphere.prototype._createWhiteText = function(string, height) {
	var text = new Text(this._canvas, string);
	text.setFontFamily("Arial Narrow");
	text.setBackgroundColor("black");
	text.setTextColor("white");
	text.setTextHeight(height);
	text.enableSquareTexture();
	
	return text;
}
