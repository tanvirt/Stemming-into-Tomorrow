function ServerListener() {}
ServerListener.prototype.onConnectionEstablished = function() {}
ServerListener.prototype.onSelfJoinedSession = function() {}
ServerListener.prototype.onSessionVariableChanged = function(variable, user) {}
ServerListener.prototype.onStreamVariableChanged = function(stream, user) {}

function Server(serverName) {
	var self = this;
	
	this._server = new VNServer();
	this._listeners = [];
	
	this._variables = new AssociativeArray();
	this._streams = new AssociativeArray();
	
	this._server.onConnectionOpened = function() { self._onConnectionOpened(); }
//	this._server.onConnectionClosed = function() { self._onConnectionClosed)(); }
//	
//	this._server.onSelfNameUpdated = function(user) { self._onSelfNameUpdated(user); }
//	this._server.onUserNameUpdated = function(user) { self._onUserNameUpdated(user); }
//	
//	this._server.onCreateNewSession = function(session) { self._onCreateNewSession(session); }
//	this._server.onNewSessionAvailable = function(session) { self._onNewSessionAvailable(session); }
//	this._server.onInitialSessionsAvailable = function(sessions) { self._onInitialSessionsAvailable(sessions); }
//	this._server.onInitialUsersInSessionAvailable = function(users) { self._onInitialUsersInSessionAvailable(users); }
//	this._server.onNoAvailableSessions = function() { self._onNoAvailableSessions(); }
//	
	this._server.onSelfJoinedSession = function(session) { self._onSelfJoinedSession(session); }
//	this._server.onUserJoinedSession = function(user) { self._onUserJoinedSession(user); }
//	this._server.onSelfLeftSession = function() { self._onSelfLeftSession(); }
//	this._server.onUserLeftSession = function(user) { self._onUserLeftSession(user); }
//	this._server.onSessionRemoved = function(session) { self._onSessionRemoved(session); }
	
	this._server.connect(serverName);
}

Server.prototype._onConnectionOpened = function() {
	for(var i = 0; i < this._listeners.length; i++)
		this._listeners[i].onConnectionOpened();
}

Server.prototype._onSelfJoinedSession = function(session) {
	for(var i = 0; i < this._listeners.length; i++)
		this._listeners[i].onSelfJoinedSession(session);
}

Server.prototype._onSessionVariableChanged = function(variable, user) {
	for(var i = 0; i < this._listeners.length; i++)
		this._listeners[i].onSessionVariableChanged(variable, user);
}

Server.prototype._onSessionStreamChanged = function(stream, user) {
	for(var i = 0; i < this._listeners.length; i++)
		this._listeners[i].onSessionStreamChanged(stream, user);
}

Server.prototype.addListener = function(listener) {
	this._listeners.push(listener);
}

Server.prototype.sessionExists = function(sessionName) {
	var sessions = this._server.getSessions();
	return sessions.hasOwnProperty(sessionName);
}

Server.prototype.createAndJoinNewSession = function(sessionName, capacity, holdPositions) {
	this._server.createAndJoinNewSession(sessionName, capacity, holdPositions);
}

Server.prototype.setSessionVariable = function(variableName, variableValue) {
	this.createSessionVariable(variableName, variableValue);
}

Server.prototype.createSessionVariable = function(variableName, variableValue) {
	this._variables.put(variableName, variableValue);
	this._createRemoteSessionVariable(variableName, variableValue);
}

Server.prototype._createRemoteSessionVariable = function(variableName, variableValue) {
	this._server.getSession().variable(variableValue);
	this._setRemoteSessionVariable(variableName, variableValue);
}

Server.prototype._setRemoteSessionVariable = function(variableName, variableValue) {
	if(this.sessionVariableExists(variableName)) {
		var variable = this._server.getSession().variable(variableName);
		variable.set(variableValue);
		this._addRemoteSessionVariableCallback(variable);
	}
}

Server.prototype._addRemoteSessionVariableCallback = function(vnVariable) {
	var self = this;
	vnVariable.onValueChanged = function(variable, user) { self._onSessionVariableChanged(variable, user); }
	//vnVariable.onUsersValueChanged = function(user, variable, initiator) { self._onUserVariableChanged(user, variable, initiator); }
}

Server.prototype._onUserVariableChanged = function(user, variable, initiator) {
	
}

Server.prototype.joinFirstAvailableSession = function(numPlayers, holdPositions) {
	this._server.joinFirstAvailableSession(numPlayers, holdPositions);
}

Server.prototype.setSessionStream = function(streamName) {
	
}

Server.prototype.createSessionStream = function(streamName, streamBuffer) {
	this._streams.put(streamName, streamBuffer);
	this._createRemoteStreamVariable(streamName, streamBuffer);
}

Server.prototype._createRemoteStreamVariable = function(streamName, streamBuffer) {
	this._server.getSession().stream(streamName);
	this._setRemoteStreamVariable(streamName, streamBuffer);
}

Server.prototype._setRemoteStreamVariable = function(streamName, streamBuffer) {
	if(this._sessionStreamExists(streamName)) {
		var stream = this._server.getSession().stream(streamName);
		stream.addFrame(streamBuffer);
		this._addRemoteStreamVariableCallback(stream);
	}
}

Server.prototype._addRemoteStreamVariableCallback = function(vnStream) {
	var self = this;
	vnStream.onFrameReceived = function(stream, user) { console.log('frame received'); self._onSessionStreamChanged(stream, user); }
	vnStream.onUsersFrameReceived = function(user, stream, initiator) { console.log('user frame'); self._onUserStreamChanged(user, stream, initiator); }
	console.log('stream callback');
}

Server.prototype._onUserStreamChanged = function(user, variable, initiator) {
	
}

Server.prototype.sessionVariableExists = function(variableName) {
	return this._variables.containsKey(variableName);
}

Server.prototype._sessionStreamExists = function(streamName) {
	return this._streams.containsKey(streamName);
}

Server.prototype.printServer = function() {
	console.log(this._server);
}
