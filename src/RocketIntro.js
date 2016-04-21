function RocketIntroState() {}
RocketIntroState.MOVING = "MOVING";
RocketIntroState.TRANSITIONING = "TRANSITIONING";

function RocketIntro(canvas) {
	this._canvas = canvas;

	this._rotation = [0, 0, 0];
	this._translation = [0, 0, 0];

	this._state = RocketIntroState.MOVING = "MOVING";

	this._resources = new AssociativeArray();
	this._loadResources();

	this._gameStartTime = 0;
}

RocketIntro.prototype.start = function() {
	this._translation = [0, -2.5, -100];
	this._canvas.getCamera().translate(this._translation);
	this._addRocketToCanvas();
	this._addQuestionToCanvas();
}

//sphere.rotate(Math.PI/4, 0, 0);
//sphere.setPosition([0, 7.5, -5]);

RocketIntro.prototype._loadResources = function() {
	this._resources.put("rocket", this._createRocket());

	var text = "Which numbers are prime numbers?";
	var position = [0, 7.5, -5];

	this._resources.put("question", this._createTransformingQuestion(text, position));
}

RocketIntro.prototype._addRocketToCanvas = function() {
	var rocket = this._resources.get("rocket");
	rocket.addToCanvas();
}

RocketIntro.prototype._addQuestionToCanvas = function() {
	var question = this._resources.get("question");
	question.addToCanvas();
}

RocketIntro.prototype._createRocket = function() {
	var rocket = new CompositeDrawable(this._canvas);
	rocket.loadOBJMTL('../data/obj/Rocket/', 'roket.mtl', 'roket.obj', '');
	rocket.translate(0, -100, -200);
	rocket.rotate(0, Math.PI, Math.PI/2);

	rocket.setAnimation(new Animation(rocket, this._createRocketAnimateFunction()));

	return rocket;
}

RocketIntro.prototype._createTransformingQuestion = function(text, position) {
	var question = new TransformingSphere(this._canvas, text);
	question.setPosition(position);
	//question.transform();

	return question;
}

RocketIntro.prototype._createRocketAnimateFunction = function() {
	var self = this;
	return function(rocket) {
		if(self._translation[2] >= 92) {
			var question = self._resources.get("question");
			question.transform();
			this._gameStartTime = new Date().getTime();
			rocket.setAnimation(new Animation(rocket, self._createNewRocketAnimateFunction()));
		}
		else {
			self._translation[2] += 1;
			self._canvas.getCamera().translate(self._translation);
			rocket.translate(0, 0, -1);
		}
	}
}

RocketIntro.prototype._createNewRocketAnimateFunction = function() {
	var self = this;
	return function(rocket) {
		if(rocket.getPosition()[2] <= -1500) {
			rocket.setAnimation(new Animation(rocket, self._transitionToGame()));
		}
		self._canvas.getCamera().translate(self._translation);
		rocket.translate(0, 0, -4);
	}
}

RocketIntro.prototype._transitionToGame = function(rocket) {
	//var targetCameraLocation = [0, 0, 0];
	//var elapsedTime = (new Date().getTime() - this._gameStartTime)/1000;
	//var transitionTime = 3;
	var self = this;
	return function(rocket) {
		if(self._translation[1] < 0) {
			self._translation[1] += 0.01; 
		}
		if(self._translation[2] < 0) {
			self._translation[2] += 0.01; 
		}

		if(self._translation[1] >= 0 && self._translation[2] >= 0 && self._translation[2] <= 100) {
			self._translation[2] += 1;
		}

		if(self._translation[2] > 100) {
			self._canvas.getCamera().translate([0,0,0]);
			var question = self._resources.get("question");
			question.removeFromCanvas();
			rocket.setAnimation(new Animation(rocket, function() {}));
		}

		self._canvas.getCamera().translate(self._translation);
	}
}
