function CanvasMath() {}

CanvasMath.degreesToRadians = function(degrees) {
	return degrees*Math.PI/180;
}

CanvasMath.radiansToDegrees = function(radians) {
	return radians*180/Math.PI;
}

CanvasMath.multiplyMat4Vec4 = function(mat, vec) {
	return [
		mat[0]*vec[0] 	+ mat[4]*vec[1] 	+ mat[8]*vec[2] 	+ mat[12]*vec[3],
		mat[1]*vec[0] 	+ mat[5]*vec[1] 	+ mat[9]*vec[2] 	+ mat[13]*vec[3],
		mat[2]*vec[0] 	+ mat[6]*vec[1] 	+ mat[10]*vec[2] 	+ mat[14]*vec[3],
		mat[3]*vec[0] 	+ mat[7]*vec[1] 	+ mat[11]*vec[2] 	+ mat[15]*vec[3]
	];
}

CanvasMath.distanceFromPointToPoint = function(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) );
}

CanvasMath.distanceFromPointToLine = function(px, py, ax, ay, bx, by) {
	var lambda = ( ((bx - ax)*(px - ax) + (by - ay)*(py - ay)) / (Math.pow((bx - ax), 2) + Math.pow((by - ay), 2)) );
	
	if(lambda < 0)
		lambda = 0;
	else if(lambda > 1)
		lambda = 1;
	
	var x = ax + lambda*(bx - ax);
	var y = ay + lambda*(by - ay);
	
	return distanceFromPointToPoint(px, py, x, y);
}

CanvasMath.getProjectedPixelPoint = function(Canvas, Point) {
	var webGLCanvas = Canvas.getWebGLCanvas();
	var mvMatrix = webGLCanvas.getCamera().mvMatrix;
	var fieldOfView = CanvasMath.degreesToRadians(webGLCanvas.getCamera().getFOV());
	var height = webGLCanvas.gl.viewportHeight;
	
	var point3d = [Point.getX(), Point.getY(), Point.getZ(), 1];
	var vector = CanvasMath.multiplyMat4Vec4(mvMatrix, point3d);
	var transformedPoint3d = new Point3d(vector[0], vector[1], vector[2]);
	
	var projectedPoint2d = CanvasMath._projectionFrom3dTo2d(transformedPoint3d, fieldOfView, height);
	var pixelX = (webGLCanvas.gl.viewportWidth / 2) + projectedPoint2d.getX();
	var pixelY = (webGLCanvas.gl.viewportHeight / 2) + projectedPoint2d.getY();
	
	return new Point2d(pixelX, pixelY);
}

// field of view must be in radians
CanvasMath._projectionFrom3dTo2d = function(Point3d, fieldOfView, height) {
	var x = Point3d.getX();
	var y = Point3d.getY();
	var z = Point3d.getZ();
	var f = CanvasMath._focalLength(fieldOfView, height);
	
	var projX = ((-x*f) / z);
	var projY = ((y*f) / z);
	
	return new Point2d(projX, projY);
}

//angle must be in radians
CanvasMath._focalLength = function(angle, height) {
	return (height / 2)*( 1 / (Math.tan(angle / 2)) );
}
