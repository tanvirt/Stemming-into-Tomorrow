// Should be used as an abstract class.
function Gesture() {
	// The elapsed duration of the recognized movement up to the frame containing this Gesture object.
	// In microseconds.
	// The duration reported for the first Gesture in the sequence (with the start state) will typically be a small positive number 
	// This is since the movement must progress far enough for the Leap to recognize it as an intentional gesture.
	this.duration = null; // Type: number
	
	// The list of hand ids associated with this Gesture, if any.
	// If no hands are related to this gesture, the list is empty.
	this.handIds = null; // Type: number[]
	
	// The gesture ID.
	// All Gesture objects belonging to the same recognized movement share the same ID value. 
	// Use the ID value to find updates related to this Gesture object in subsequent frames.
	// DEV: perhaps the id could be the time at the start of the gesture
	this.id = null; // Type: number
	
	// The list of fingers and tools associated with this Gesture, if any.
	// If no Pointable objects are related to this gesture, the list is empty.
	this.pointableIds = null; // Type: Array
	
	// The gesture state.
	// Recognized movements occur over time and have a beginning, a middle, and an end.
	// The state attribute reports where in that sequence this Gesture object falls.
	// Possible values for the state field are: start, update, stop
	this.state = null; // Type: string
	
	// The gesture type.
	this.type = null; // Type: string
}

Gesture.prototype.isOccurring = function(frame) {} // Abstract method.
Gesture.prototype.updateProperties = function(frame) {} // Abstract method.
Gesture.prototype.resetProperties = function() {} // Abstract method.

// Template method.
Gesture.prototype.reset = function() {
	this.duration = null;
	this.handIds = null;
	this.id = null; // DEV: generate new random id instead
	this.pointableIds = null;
	this.state = null;
	
	this.resetProperties();
}
