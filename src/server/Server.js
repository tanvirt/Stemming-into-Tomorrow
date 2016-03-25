/*
 * Store a copy of all the server variable and update them here... provide an interface for using objects to get the variables and modify
 * them in this class..... Yay! also... you can only get for sure updates from vars in the scope of the onvarchanged callback so do
 * the updates here an nowhere else...
 * 
 */

function Server(serverVariables, owner, userName) {
	var self = this;
	this.owner = owner;
	this.userName = userName;
	
	this.serverVars = new AssociativeArray();
	this.serverVars.initWithKeys(serverVariables);
	
	this.server = new VNServer();
	
	this.variablesToAddToSession = serverVariables;
	this.server.onConnectionOpened = function() {self._onConnectionEstablished();}
	this.server.onSelfJoinedSession = function(session) {self._onJoinedSession(session);}
	
	this.server.onUserJoinedSession = function(user) {
		console.log(user);
	}
	
	this.server.onUserNameUpdated = function(user) {
 		console.log(user);
	}
	
	this.server.onSelfNameUpdated = function(user) {
//		console.log(user);
//		console.log(self.server.me());
	}
	
	this._initServer();
}

/*
 * Below are PUBLIC
 */


Server.prototype.createVariable = function(varName, varValue) {
	this.serverVars.put(varName, varValue);
	this._createRemoteVNVariable(varName, varValue);
}


Server.prototype.modifyVariable = function(targetVariable, modification) {
	if(this._variableExists(targetVariable)) {
		this._updateLocalVariable(targetVariable, modification);
		this._updateRemoteVariable(targetVariable, modification);
	}
	else
		console.log("Variable: " + targetVariable + " does not exist");
}

Server.prototype.printCurrentLocalVariables = function() {
	for(var variable in this.server.currentSession.variables())
		console.log(variable);
}






/*
 * Below are PRIVATE
 */





Server.prototype._initServer = function() {
	this.server.connect("Experiential Learning");
}

Server.prototype._onConnectionEstablished = function() {
	if(this.userName != undefined) {
		//this.server.setUserName(this.userName);
	}
	this.server.joinFirstAvailableSession(2, false);
}

Server.prototype._onJoinedSession = function(session) {
	var keys = this.serverVars.getKeys();
	for(var i = 0; i < keys.length; i++)
		this._createRemoteVNVariable(keys[i], "");
	
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
	this.server.getSession().variable(varName);
	this._setRemoteVNVariable(varName, varValue);
}

Server.prototype._setRemoteVNVariable = function(varName, varValue) {
	if(this._variableExists(varName)) {
		var vnVariable = this.server.getSession().variable(varName);
		vnVariable.set(varValue);
		this._addVNVariableCallback(vnVariable);
	}
	else {
		console.log("Variable: " + varName + " does not exist");
	}
}

Server.prototype._addVNVariableCallback = function(vnVariable) {
	var self = this;
	vnVariable.onValueChanged = function(variable, user) {self._onSessionVariableValueChanged(variable, user);}
	vnVariable.onUsersValueChanged = function(user, variable, initiator){self._onUserVariableValueChanged(user, variable, initiator);}
}

Server.prototype._onSessionVariableValueChanged = function(variable, user) {
	console.log("vnVariableChange");
	if(this._variableExists(variable.name)) {
		 this.serverVars.replace(variable.name, variable.value());
		 console.log("Local Var: " + variable.name + " Value: " + this.serverVars.get(variable.name));
		 console.log("Remote Var: " + variable.name + " Value: " + variable.value());
	}
	else
		this.serverVars.put(variable.name, variable.value());

}

Server.prototype._onUserVariableValueChanged = function(user, variable, initiator) {
	console.log("onUserVarChanged");
	if(this._variableExists(variable.name)) {
		 this.serverVars.replace(variable.name, variable.value());
		 console.log("UserVar Changed By: " + variable + "Remote Var: " + variable.name + " Value: " + variable.value());
	}
	else
		this.serverVars.put(variable.name, variable.value());
}

Server.prototype._getRemoteVNVariable = function(varName) {
	if(this._variableExists(varName))
		return this.server.currentSession.variable(varName);
	else {
		console.log("Remote Variable " + varName + " does not exist");
	}
}

Server.prototype._updateRemoteVariable = function(remoteVariableName, modification) {
	var target = this._getRemoteVNVariable(remoteVariableName);
	target.changeBy(target.value() + modification);
}

Server.prototype._updateLocalVariable = function(localVariableName, modification) {
	var target = this._getLocalVNVariable(localVariableName);
	target += modification;
	this.serverVars.replace(localVariableName, target);
}

Server.prototype._variableExists = function(varName) {
	return this.serverVars.containsKey(varName);
}
