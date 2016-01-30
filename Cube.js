//Point??? or center??? Capital for objects
/*
function Cube(Canvas, Point, height) {
	if(arguments.length != 3){ return; }
	DrawableObject.apply(this, arguments);
	this._center = Point;
	this._height = height;
	this.test();
} Cube.prototype = new DrawableObject();

Cube.prototype.test = function () {
	console.log('Here');
}
*/



function Cube(Canvas, Point, height) {
	if(arguments.length != 3) { return; }
	DrawableObject.apply(this, arguments);
	this._center = Point;
	this._height = height;
	console.log(arguments);
    this._makeCube();
} Cube.prototype = new DrawableObject();

Cube.prototype._makeCube = function() {
	//console.log([this._center.getX()-(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()-(this._height/2)]);
	this.graphic.setXYZ([ //Front Face starting from top left and going clockwise
	                      this._center.getX()-(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()+(this._height/2),  
	                      this._center.getX()+(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()+(this._height/2),
	                      this._center.getX()+(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()+(this._height/2),
	                      this._center.getX()-(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()+(this._height/2),
						
	                      //Rear Face starting from its top left and going clockwise --- As if you are looking at the 
	                      this._center.getX()+(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()-(this._height/2),
	                      this._center.getX()-(this._height/2), this._center.getY()+(this._height/2), this._center.getZ()-(this._height/2),
	                      this._center.getX()-(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()-(this._height/2),
	                      this._center.getX()+(this._height/2), this._center.getY()-(this._height/2), this._center.getZ()-(this._height/2)
	                      ]);

	this.graphic.setTriangles([//Front Face, Right Face, Rear Face, Left Face, Top Face, Bottom Face --Each new line
						0,1,2, 2,3,0,
						1,4,7, 7,2,1,
						4,5,6, 6,7,4,
						5,0,3, 3,6,5,
						0,5,4, 4,1,0,
						2,7,6, 6,3,2
						]);
	this.graphic.setColors([1,0,0, 1,1,0, 1,0,1, 1,1,1, 0,0,0, 0,1,0, 0,0,1, 0,1,1]); 
}

Cube.prototype.draw = function() {
	this.graphic.updateShader();
	this.graphic.draw();
}

WebGLObject.onDrag= function(event){
	this.onDrag(event);
}

Cube.prototype.onDrag = function(event) {
	c.getCamera().oneFingerRotate(event);
}

/*
This is how to draw a multi-colored cube.k


var c = new WebGLCanvas("div_container");
var cubeOne = new WebGLObject(c);
var cubeTwo = new WebGLObject(c);

c.onSetup = function() {
   cubeOne.setXYZ([0.25,0.75,0.75, 0.75,0.75,0.75, 0.25,0.25,0.75, 0.75,0.25,0.75, 0.25,0.75,0.25, 0.75,0.75,0.25, 0.25,0.25,0.25, 0.75,0.25,0.25]);
   cubeOne.setColors([1,0,0, 1,1,0, 1,0,1, 1,1,1, 0,0,0, 0,1,0, 0,0,1, 0,1,1]);   
   cubeOne.setTriangles([0,2,1, 1,2,3, 1,3,5, 5,3,7, 0,4,2, 2,4,6, 4,5,6, 6,5,7, 0,1,4 , 4,1,5, 2,3,6, 6,3,7]);
   
   cubeTwo.setXYZ([-0.75,-0.25,-0.25, -0.25,-0.25,-0.25, -0.75,-0.75,-0.25, -0.25,-0.75,-0.25, -0.75,-0.25,-0.75, -0.25,-0.25,-0.75, -0.75,-0.75,-0.75, -0.25,-0.75,-0.75]);
   cubeTwo.setColors([1,0,0, 1,1,0, 1,0,1, 1,1,1, 0,0,0, 0,1,0, 0,0,1, 0,1,1]);   
   cubeTwo.setTriangles([0,2,1, 1,2,3, 1,3,5, 5,3,7, 0,4,2, 2,4,6, 4,5,6, 6,5,7, 0,1,4 , 4,1,5, 2,3,6, 6,3,7]);

   c.setBackgroundColor(0,0,0);
   c.setLoadingStatus(false);
   cubeOne.onDrag= function(event) {
      WebGLObject.onDrag(event);
   };
   cubeTwo.onDrag= function(event) {
      WebGLObject.onDrag(event);
   }

};
WebGLObject.onDrag= function(event){
   c.getCamera().oneFingerRotate(event);
};
c.onDrag=function(event){ //c.getCamera().oneFingerMove(event); 
                           
};

c.onDraw = function() {
   var gl=c.getGL();
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   cubeOne.updateShader();
   cubeOne.draw();

   cubeTwo.updateShader();
   cubeTwo.draw();
};

c.start();
*/