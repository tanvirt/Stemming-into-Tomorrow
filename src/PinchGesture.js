// Implements Gesture interface in the Leap Motion JavaScript API.
function PinchGesture() {
	// https://developer.leapmotion.com/documentation/javascript/api/Leap.Gesture.html
	
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
	// Use the ID value with the Frame.gesture() method to find updates related to this Gesture object in subsequent frames.
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
	// Possible values for the type field are: circle, swipe, screenTap, keyTap
	this.type = "pinch";
	
	this.position = null;
}