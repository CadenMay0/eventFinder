  var config = {
    apiKey: "AIzaSyBhXlVx_h3lQufs0t13aevXF7wF8jBa_x0",
    authDomain: "eventfinder-87f63.firebaseapp.com",
    databaseURL: "https://eventfinder-87f63.firebaseio.com",
    projectId: "eventfinder-87f63",
    storageBucket: "eventfinder-87f63.appspot.com",
    messagingSenderId: "508334366029"
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

//Add id for submit button.
	$("#submit").on("click", function(event) {
	  	event.preventDefault();

	//Add id for the location that the user enters
	  	var city = $("#city-input").val().trim();
	  	var state = $("#state-input").val().trim();
	  	var zipCode = $("#zip-input").val().trim();

	  	var userSearch = {
	  		city: city,
	  		state: state,
	  		zipCode: zipCode
	  	};

	  	dataRef.ref().push(userSearch);

	  	console.log(userSearch.city);
	  	console.log(userSearch.state);
	  	console.log(userSearch.zipCode);

	  	$("#city-input").val("");
	  	$("#state-input").val("");
	  	$("#zip-input").val("");

	});//submit button function

	dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	city = childSnapshot.val().city;
	state = childSnapshot.val().state;
	zipCode = childSnapshot.val().zipCode;

	console.log(city);
	console.log(state);
	console.log(zipCode);

	$("#table > tbody").append("<tr><td>" + city + "</td><td>" + state + "</td><td>" + zipCode + "</td></tr>");

	});


	$("#submit").on("click", function(event) {
	  	event.preventDefault();

	var postalCode = zipCode;
	
	if (postalCode < 99999 && postalCode > 10000) {
		console.log("Valid Zip Code Entered")
	}	
	else {
		event.preventDefault();
		$("#table tr:last").remove();
		console.log("Not a Valid Zip Code");
	}
	});