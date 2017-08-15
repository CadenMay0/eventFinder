  //When the page loads, that users last search will appear in eventsTBL and dealsTBL	
  	$(document).ready(function() {

		city = (localStorage.getItem("city", city));
		state = (localStorage.getItem("state", state));
		zipCode = (localStorage.getItem("zipCode", zipCode));
		radi = (localStorage.getItem("radius", radius));

		console.log("Local Storage: ");
		console.log(city);
		console.log(state);
		console.log(zipCode);
		console.log(radi);
	
	});

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
  var stateSTR = " ";
  var citySTR = " ";
  var zipSTR = " ";
  var radiusSTR = " ";
//Add id for submit button.
	$("#submit").on("click", function(event) {
	  	event.preventDefault();

	  	var validZip = true;
	  	var zipLength = zipCode.length;
	  	if (zipLength === 5) {
	  		$("#alert").empty();
	  		console.log("Valid zip code: " + zipCode);
            sqoot(function () {
                dataRef.ref().push(userSearch);
            });
            
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		  	$("#radius").val("");
	  		return true;
	  	}
	  	//If zip code is not 5 characters, remove value from the table/ alert user zip code is not valid.
	  	else{
	  		event.preventDefault();
	  		$("#alert").html("* " + zipCode + " IS NOT A VALID ZIP CODE.");
	  		console.log(zipCode + " is not a valid zip code.")
	  		//Clear text input values
	  		  	$("#city-input").val("");
	  		  	$("#state-input").val("");
	  		  	$("#zip-input").val("");
	  		  	$("#radius").val("");
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

	//Clear local storage
	localStorage.clear();


	//Sets local storage to the last value entered by the user.
	localStorage.setItem("city", city);
	localStorage.setItem("state", state);
	localStorage.setItem("zipCode", zipCode);
	localStorage.setItem("radius", radius);
	

	//Append user input data to the recent searches table.
	$("#recentTable > tbody").prepend("<tr><td class='cityData'>" + city + "</td><td class='stateData'>" + state + "</td><td class='zipData'>" + zipCode + "</td><td class='radiusData'>" + radius + "</td></tr>");

	});


	  	//Regular expression checking city input for invalid characters.
	  	function checkCity(input) {
	  		var regex = /[^a-z ]/gi;
                input.value = input.value.replace(regex, "");
                //citySTR = citySTR + input;
                //dataRef.ref().child('city')
                 //   .startAt(citySTR)
                 //   .endAt(citySTR + '\uf8ff')
                 //   .limit(10)
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

	  	//Regex checking radius for illegal characters.
	  	function checkRadius (input) {
	  		regex = /[^0-9]/g;
	  		input.value = input.value.replace(regex, "");
	  	}	 


