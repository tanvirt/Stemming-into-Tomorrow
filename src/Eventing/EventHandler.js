/*
 * Pass in a function(DrawableObject) that allows you to configure object actions on the event fire...
 */


function EventHandler(eventHandlingFunction) {
	this._dynamicFunction = function(sourceDrawable, targetDrawable) {console.log("EventHandler dynamic function was not defined!");};
	this._initDynamicFunction(eventHandlingFunction);
}

EventHandler.prototype.handle = function(DrawableObject) {
	this._dynamicFunction(sourceDrawable, targetDrawable);
}


EventHandler.prototype._initDynamicFunction = function(eventHandlingFunction) {
	if(eventHandlingFunction != undefined)
		this.dynamicFunction = eventHandlingFunction;
}
