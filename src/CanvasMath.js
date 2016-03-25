function CanvasMath() {}

CanvasMath.generateUniqueString = function(length) {
	var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array(length).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
}

CanvasMath.getMidpoint = function(point1, point2) {
	var midpoint = [];
    for(var i = 0; i < 3; i++)
    	midpoint.push((point1[i] + point2[i])/2);
    
    return midpoint;
}

// DEV: this conversion needs to be updated.
CanvasMath.leapPointToGlPoint = function(leapXYZ) {
	var glXYZ = [];
	glXYZ[0] = 0.0 + 0.006*leapXYZ[0];
	glXYZ[1] = -0.9 + 0.004*leapXYZ[1];
	glXYZ[2] = 0.0 + 0.007*leapXYZ[2];
	
	return glXYZ;
}

CanvasMath.degreesToRadians = function(degrees) {
	return degrees*Math.PI/180;
}

CanvasMath.radiansToDegrees = function(radians) {
	return radians*180/Math.PI;
}

CanvasMath.multiplyMat3Vec3 = function(mat, vec) {
	return [
		mat[0]*vec[0] 	+ mat[3]*vec[1] 	+ mat[6]*vec[2],
		mat[1]*vec[0] 	+ mat[4]*vec[1] 	+ mat[7]*vec[2],
		mat[2]*vec[0] 	+ mat[5]*vec[1] 	+ mat[8]*vec[2]
	];
}

CanvasMath.multiplyMat4Vec4 = function(mat, vec) {
	return [
		mat[0]*vec[0] 	+ mat[4]*vec[1] 	+ mat[8]*vec[2] 	+ mat[12]*vec[3],
		mat[1]*vec[0] 	+ mat[5]*vec[1] 	+ mat[9]*vec[2] 	+ mat[13]*vec[3],
		mat[2]*vec[0] 	+ mat[6]*vec[1] 	+ mat[10]*vec[2] 	+ mat[14]*vec[3],
		mat[3]*vec[0] 	+ mat[7]*vec[1] 	+ mat[11]*vec[2] 	+ mat[15]*vec[3]
	];
}

// Angles must be in radians.
CanvasMath.getRotatedXYZ = function(xyz, thetaX, thetaY, thetaZ) {
	var rotatedXYZ = xyz;
	if(thetaX != 0) {
		var xRotationMatrix = CanvasMath._createXRotationMatrix(thetaX);
		rotatedXYZ = CanvasMath.multiplyMat3Vec3(xRotationMatrix, rotatedXYZ);
	}
	if(thetaY != 0) {
		var yRotationMatrix = CanvasMath._createYRotationMatrix(thetaY);
		rotatedXYZ = CanvasMath.multiplyMat3Vec3(yRotationMatrix, rotatedXYZ);
	}
	if(thetaZ != 0) {
		var zRotationMatrix = CanvasMath._createZRotationMatrix(thetaZ);
		rotatetdXYZ = CanvasMath.multiplyMat3Vec3(zRotationMatrix, rotatedXYZ);
	}
	return rotatedXYZ;
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

CanvasMath.getProjectedPixelPoint = function(canvas, xyz) {
	var mvMatrix = canvas.getCamera().mvMatrix;
	var fieldOfView = CanvasMath.degreesToRadians(canvas.getCamera().getFOV());
	var height = canvas.gl.viewportHeight;
	
	var point = [xyz[0], xyz[1], xyz[2], 1];
	var vector = CanvasMath.multiplyMat4Vec4(mvMatrix, point);
	
	var projectedPoint = CanvasMath._projectionFrom3dTo2d(vector, fieldOfView, height);
	var pixelX = (canvas.gl.viewportWidth / 2) + projectedPoint[0];
	var pixelY = (canvas.gl.viewportHeight / 2) + projectedPoint[1];
	
	return [pixelX, pixelY];
}

// Field of view must be in radians.
CanvasMath._projectionFrom3dTo2d = function(xyz, fieldOfView, height) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var f = CanvasMath._focalLength(fieldOfView, height);
	
	var projX = ((-x*f) / z);
	var projY = ((y*f) / z);
	
	return [projX, projY];
}

// Angle must be in radians.
CanvasMath._focalLength = function(angle, height) {
	return (height / 2)*( 1 / (Math.tan(angle / 2)) );
}

//Angle must be in radians.
CanvasMath._createXRotationMatrix = function(theta) {
	return [
  		1,					0,					0,
  		0,					Math.cos(theta),	-Math.sin(theta),
  		0,					Math.sin(theta),	Math.cos(theta)
  	];
}

// Angle must be in radians.
CanvasMath._createYRotationMatrix = function(theta) {
	return [
  		Math.cos(theta),	0,					Math.sin(theta),
  		0,					1,					0,
  		-Math.sin(theta),	0,					Math.cos(theta)
  	];
}

// Angle must be in radians.
CanvasMath._createZRotationMatrix = function(theta) {
	return [
  		Math.cos(theta),	-Math.sin(theta),	0,
  		Math.sin(theta),	Math.cos(theta),	0,
  		0,					0,					1
  	];
}
