function TouchEvent() {
	
}TouchEvent.prototype = new Event();

TouchEvent.prototype.eventOccurred = function(sourceDrawable, targetDrawable) {
	return true;
}