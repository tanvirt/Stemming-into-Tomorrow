function AnswerArea(canvas, size) {
	if(arguments.length < 2) return;
	Rectangle.call(this, canvas, size, size, size);
	
	this._answers = [];
	this._answerObjects = [];
	this._listenerList = [];
	
	this.setColorMask([1, 1, 1, 0.5]);
	this.disableShading();
	this.disableTexture();
	this.addBoundingBox(size, size, size);
	
	this.setAnimation(new Animation(this, this._createAnimationFunction()));
} AnswerArea.prototype = new Rectangle();

AnswerArea.prototype._createAnimationFunction = function() {
	return function(answerArea) {
		answerArea.rotate(0.01, 0.01, 0.01);
		answerArea._updateAnswerObjects();
		try {
			var collidees = octree_global.getCollidees(answerArea.getBoundingBox());
			for(var i = 0; i < collidees.length; i++) {
				var collidee = collidees[i];
				if(!answerArea.contains(collidee)) {
					answerArea._addObject(collidee);
					if(answerArea.isCorrectAnswer(collidee.getText()))
						answerArea.notify();
				}
			}
		}
		catch(e) {}
	}
}

AnswerArea.prototype.addListener = function(answerListener) {
	this._listenerList.push(answerListener);
}

AnswerArea.prototype.notify = function() {
	for(var i = 0; i < this._listenerList.length; i++) {
		this._listenerList[i].update();
	}
} 

AnswerArea.prototype._updateAnswerObjects = function() {
	for(var i = 0; i < this._answerObjects.length; i++) {
		var drawable = this._answerObjects[i];
		if(this.intersects(drawable)) {
			if(this.isCorrectAnswer(drawable.getText()))
				drawable.setColorMask([0,1,0,1]);
			else
				drawable.setColorMask([1,0,0,1]);
		}
		else {
			drawable.setColorMask([1,1,1,1]);
			var index = this._answerObjects.indexOf(drawable);
			if(index != -1) {
				if(this.isCorrectAnswer(this._answerObjects[index].getText()))
					this.notifyCorrectAnswerRemoved();
				this._answerObjects.splice(index, 1);
			}
		}
	}
}

AnswerArea.prototype.notifyCorrectAnswerRemoved = function() {
	for(var i = 0; i < this._listenerList.length; i++) {
		this._listenerList[i].correctAnswerRemovedFromBin();
	}
}

AnswerArea.prototype.setCorrectAnswers = function(answers) {
	this._answers = answers;
}

AnswerArea.prototype.isCorrectAnswer = function(answer) {
	for(var i = 0; i < this._answers.length; i++) {
		if(answer == this._answers[i]) {
			return true;
		}
	}
	return false;
}

AnswerArea.prototype.contains = function(drawableObject) {
	for(var i = 0; i < this._answerObjects.length; i++)
		if(this._answerObjects[i].getId() == drawableObject.getId())
			return true;
	return false;
}

AnswerArea.prototype._addObject = function(drawableObject) {
	drawableObject.addListenerToDrawableObject(this);
	this._answerObjects.push(drawableObject);
}

AnswerArea.prototype._getContainingObject = function(drawable) {
	
	for(var i = 0; i < this._answerObjects; i++) {
		if(drawable.getId() == this._answerObjects[i].getId())
			return this._answerObjects[i];
	}
	return null;
}

AnswerArea.prototype.update = function(drawable) {
	
}