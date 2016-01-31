var inputDevice = new LeapMotionInputDevice();
var canvas = new Canvas("div_container", inputDevice);
canvas.getWebGLCanvas().onDrag = function(event) {
	canvas.getWebGLCanvas().camera.oneFingerRotate(event);
}
//var hand = new Hand(canvas);
//hand.addToCanvas();

//Testing Rectangle
var center = new Point(0,0,0);
var rectangle = new Rectangle(canvas, center, 0.3, 0.8, 0.5);
rectangle.addToCanvas();

//Testing Cube Class
/*
var center = new Point(0.25,-0.1,0.3);

var cube = new Cube(canvas, center, 0.5);
cube.addToCanvas();
*/

/*
// Testing text class
//-------------------------------------------------------
var text = new Text(canvas, "Hello World!");
var textCube = new DrawableObject(canvas);

textCube.setCenter(0, 0, 0);
textCube.graphic.setXYZ([-0.5,0.5,0.5, 0.5,0.5,0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5, -0.5,0.5,-0.5, 0.5,0.5,-0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,-0.5, 0.5,-0.5,-0.5, -0.5,0.5,0.5, -0.5,-0.5,0.5, -0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,0.5,0.5, 0.5,0.5,0.5, -0.5,0.5,-0.5, 0.5,0.5,-0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5]);
textCube.graphic.setUV([0,1, 1,1, 0,0, 1,0, 1,1, 0,1, 1,0, 0,0, 0,1, 0,0, 1,1, 1,0, 1,1, 1,0, 0,1, 0,0, 0,0, 1,0, 0,1, 1,1, 1,0, 0,0, 1,1, 0,1]);
textCube.graphic.setTriangles([0,2,1, 1,2,3, 4,5,6, 6,5,7, 9,11,8, 8,11,10, 13,12,15, 15,12,14, 16,17,18, 18,17,19, 21,20,22, 21,22,23]);
textCube.graphic.setTexture(text.getTexture());

textCube.addToCanvas();
//-------------------------------------------------------



// Testing pinch recognition
//-------------------------------------------------------
var listener = new GestureListener();
listener.onPinch = function(pinchCenter) {
	console.log(pinchCenter);
	textCube.translate(0.0, 0.0, -0.01);
}

inputDevice.addGestureListener(listener);
//-------------------------------------------------------
*/