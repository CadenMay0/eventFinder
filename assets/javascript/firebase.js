  //Initialize firebase
  var config = {
    apiKey: "AIzaSyBhXlVx_h3lQufs0t13aevXF7wF8jBa_x0",
    authDomain: "eventfinder-87f63.firebaseapp.com",
    databaseURL: "https://eventfinder-87f63.firebaseio.com",
    projectId: "eventfinder-87f63",
    storageBucket: "eventfinder-87f63.appspot.com",
    messagingSenderId: "508334366029"
  };

  firebase.initializeApp(config);

  //Create a variable to reference the database
  var dataRef = firebase.database();

//Add id for submit button.
	$("#submit").on("click", function(event) {
	  	event.preventDefault();

	//Add id for the location that the user enters
	  	var city = $("#city-input").val().trim();
	  	var state = $("#state-input").val().trim();
	  	var zipCode = $("#zip-input").val().trim();
	  	var radius = $("#radius").val().trim();

	  	var userSearch = {
	  		city: city,
	  		state: state,
	  		zipCode: zipCode,
	  		radius: radius
	  	};
	//Firebase watcher and initial loader
	  	console.log(userSearch.city);
	  	console.log(userSearch.state);
	  	console.log(userSearch.zipCode);
	  	console.log(userSearch.radius);

	  	var validZip = true;
	  	var zipLength = zipCode.length;
	  	if (zipLength === 5) {
	  		$("#alert").empty();
	  		dataRef.ref().push(userSearch);
	  		console.log("Valid zip code: " + zipCode);
	  		sqoot();
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		return true;
	  	}
	  	//If zip code is not 5 characters, remove value from the table/ alert user zip code is not valid.
	  	else{
	  		event.preventDefault();
	  		$("#alert").html(zipCode + " is not a valid zip code.");
	  		console.log(zipCode + " is not a valid zip code.")
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		return false;
	  	}	

 
	});//submit button function

	dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	city = childSnapshot.val().city;
	state = childSnapshot.val().state;
	zipCode = childSnapshot.val().zipCode;
	radius = childSnapshot.val().radius;

	console.log(city);
	console.log(state);
	console.log(zipCode);
	console.log(radius);

	//Append user input data to the recent searches table.
	$("#recentTable > tbody").append("<tr><td id='cityData'>" + city + "</td><td id='stateData'>" + state + "</td><td id='zipData'>" + zipCode + "</td><td id='radiusData'>" + radius + " miles</td></tr>");
		//Append zip code to zip-input and submit the form.
		//$("#zipData").on("click", function() {	
		//	var zipInput = $("#zip-input");
			//$("#zipData").val().append(zipInput);
		//});
	});
	  	//Regular expression checking city input for invalid characters.
	  	function checkCity(input) {
	  		var regex = /[^a-z ]/gi;
	  		input.value = input.value.replace(regex, "");
	  	}

	  	//Regular expression checking state input for invalid characters.
	  	function checkState(input) {
		  	regex = /[^a-z ]/gi;
		  	input.value = input.value.replace(regex, "");
	  	}

	  	//Regex checking zip for illegal characters.
	 	function checkZip(input) {
		  	regex = /[^0-9]/g;
		  	input.value = input.value.replace(regex, "");
	  	}	  	

	  	function checkRadius (input) {
	  		regex = /[^0-9]/g;
	  		input.value = input.value.replace(regex, "");
	  	}	 