/*
 * Store a copy of all the server variable and update them here... provide an interface for using objects to get the variables and modify
 * them in this class..... Yay! also... you can only get for sure updates from vars in the scope of the onvarchanged callback so do
 * the updates here an nowhere else...
 * 
 */

function Server(serverVariables, owner) {
	var self = this;
	this.owner = owner;
	
	this.serverVars = new AssociativeArray();
	this.serverVars.initWithKeys(serverVariables);
	
	this.server = new VNServer();
	this.variablesToAddToSession = serverVariables;
	this.server.onConnectionOpened = function() {self._onConnectionEstablished();}
	this.server.onSelfJoinedSession = function(session) {self._onJoinedSession(session);}
	
	this._initServer();
}

Server.prototype.setVariable = function(varName, varValue) {
	this._setLocalVNVariable(varName, varValue);
	this._setRemoteVNVariable(varName, varValue);
}


Server.prototype.modifyVariable = function(targetVariable, modification) {
	var target = this._getRemoteVNVariable(targetVariable);
	var value = target.value();
	target.changeBy(target.value() + modification);
}

Server.prototype.printCurrentLocalVariables = function() {
	for(var variable in this.server.currentSession.variables())
		console.log(variable);
}





Server.prototype._initServer = function() {
	this.server.connect("Experiential Learning");
}

Server.prototype._onConnectionEstablished = function() {
	this.server.joinFirstAvailableSession(2, true);
}

Server.prototype._onJoinedSession = function(session) {
	console.log(this.serverVars.getKeys());
	var keys = this.serverVars.getKeys();
	for(var i = 0; i < keys.length; i++) {
		console.log(keys[i]);
		this._createRemoteVNVariable(keys[i], "");
	}
	
	this._fireInitCompletedEvent();
}

Server.prototype._fireInitCompletedEvent = function() {
	this.owner.acceptnotification(this);
}

Server.prototype._getLocalVNVariable = function(key) {
	return this.serverVars.get(key);
}

Server.prototype._setLocalVNVariable = function(key, value) {
	this.serverVars.put(key, value);
}

Server.prototype._createRemoteVNVariable = function(varName, varValue) {
	var vnVariable = this.server.currentSession.variable(varName);
	this._setRemoteVNVariable(varName, varValue, vnVariable);
	
}

Server.prototype._setRemoteVNVariable = function(varName, varValue) {
	if(this.serverVars.containsKey(varName)) {
		var vnVariable = this.server.currentSession.variable(varName);
		vnVariable.set(varValue);
		this._addVNVariableCallback(vnVariable);
	}
	else {
		console.log("Variable: " + varName + " does not exist");
	}
}

Server.prototype._addVNVariableCallback = function(vnVariable) {
	var self = this;
	vnVariable.onValueChanged = function(variable, user) {self._onVariableValueChanged(variable, user);}
}

Server.prototype._onVariableValueChanged = function(variable, user) {
	console.log("onVarChanged");
	if(this.serverVars.containsKey(variable.name)) {
		 this.serverVars.replace(variable.name, variable.value());
		 console.log("Local Var:" + variable.name + " Value: " + this.serverVars.get(variable.name));
		 console.log("Remote Var: " + variable.name + " Value: " + variable.value());
	}
	else
		console.log("Error: Key " + variable.name + " does not exist in local server (the class!) variable set");
}

Server.prototype._getRemoteVNVariable = function(varName) {
	if(this.serverVars.containsKey(varName))
		return this.server.currentSession.variable(varName);
	else {
		console.log("Remote Variable " + varName + " does not exist");
	}
}
