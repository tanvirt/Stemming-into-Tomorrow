function EventDispatcher() {
	//This maybe should be a AssociativeBin Class instead of the below to ensure TDA
	this._listenerList = new AssociativeArray();
}

EventDispatcher.prototype.addEventListener = function(eventType, listener) {
	if(this._eventExists(eventType))
		this._addToListenerList(eventType, listener);
	else {
		this._addNewEventType(eventType);
		this._addToListenerList(eventType, listener);
	}
}

EventDispatcher.prototype.removeEventListener = function(eventType, listener) {
	var eventBin = this._getEventTypeBin(eventType);
	this._replaceEventListenerBin(eventType, eventBin);
}

EventDispatcher.prototype.checkForEvents = function() {
	//find events happening....
}

EventDispatcher.prototype.dispatch = function(eventType, source, target) {
	//How to find the objects that are interacting????
	//Maybe different way??
}

EventDispatcher.prototype.fireEvent = function(event) {
	
}



EventDispatcher.prototype._addToListenerList = function(eventType, listener) {
	this._getEventTypeBin(eventType).push(listener);
}

EventDispatcher.prototype._addNewEventType = function(eventType) {
	this._listenerList.put(eventType, []);
}

EventDispatcher.prototype._eventExists = function(eventType) {
	return this._listenerList.containsKey(eventType);
}

EventDispatcher.prototype._getEventTypeBin = function(eventType) {
	return this._listenerList.get(eventType);
}

EventDispatcher.prototype._removeListenerFromEventBin = function(eventBin, listener) {
	var index = eventBin.indexOf(listener);
	if(index > -1)
		return eventBin.splice(index, 1);
	else 
		return eventBin;
}

EventDispatcher.prototype._replaceEventListenerBin = function(eventType, eventBin) {
	this._listenerList.replace(eventType, eventBin);
}
