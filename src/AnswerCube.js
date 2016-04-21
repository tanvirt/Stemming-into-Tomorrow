function AnswerCube(canvas, text, size) {
	if(arguments.length < 3) return;
	Rectangle.call(this, canvas, size, size, size);
	
	this._text = text;

	this.setTexture(this._createBlackText(this._text, 60).getTexture());
	this.addBoundingBox(size, size, size);

	this.setAnimation(new Animation(this, this._createAnimationFunction()));
} AnswerCube.prototype = new Rectangle();

AnswerCube.prototype.getText = function() {
	return this._text;
}

AnswerCube.prototype.setText = function(text) {
	this._text = text;
	this.setTexture(this._createBlackText(this._text, 60).getTexture());
}

AnswerCube.prototype._createBlackText = function(string, height) {
	var text = new Text(this._canvas, string);
	text.setBackgroundColor("white");
	text.setTextColor("black");
	text.setTextHeight(height);
	text.enableSquareTexture();
	
	return text;
}

AnswerCube.prototype._createAnimationFunction = function() {
	return function(answerCube) {
		answerCube.rotate(0, 0.01, 0);
	}
}
