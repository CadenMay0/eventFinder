// JavaScript source code
//APIs to use: Sqoot, TrailsAPI, potentially Meetups API, geocoding API,
//ids = city-input state-input zip-input button = submit
//meetups output: group name, event name, address, description, and image if possible

var sqootApi = "ovpws1";

var meetKey = "4c77123e5f7016b245c5de43306a";

var zipCode = "";
var radi = "";

var long = "";
var lati = "";

$("#submit").on("click", function () {
    zipCode = $("#zip-input").val();
    radi = $('#radius option:selected').text();
    console.log(zipCode);
    console.log(radi);

})
function sqoot() {
    var sqootUrl = "http://api.sqoot.com/v2/deals?api_key=" + sqootApi + "&location=" + zipCode + "&page=1";
    $.ajax({
        url: sqootUrl,
        method: "GET"
    }).done(function (response) {
        var results = response.deals;
        var query = response.query;
        console.log(response);
        //console.log(query);
        //console.log(results);
        long = query.location.longitude;
        lati = query.location.latitude;
        for (var d = 0; d < results.length; d++) {
            var newTBL = $("<tr>");
            newTBL.addClass("deal");
            var colIMG = $("<td>");
            var colInf = $("<td>");
            colIMG.addClass("col-md-2");
            colInf.addClass("col-md-10");
            colIMG.html("<img src='" + results[d].deal.image_url + "'/>");
            colInf.html("<p>" + results[d].deal.title + "</p><br><a href='" + results[d].deal.url + "'>" + results[d].deal.url + "</a>");
            colIMG.appendTo(newTBL);
            colInf.appendTo(newTBL);
            newTBL.appendTo("#dealsTBL");
        }


        meetups();
    }).fail(function () {
        console.log("oop");
    }) 
}

function meetups() {
    var meetURL = "https://api.meetup.com/find/events?&sign=true&key=" + meetKey + "&photo-host=public&lon=" + long + "&lat=" + lati + "&page=1&radius=2";
    $.ajax({
        url: meetURL,
        method: "GET",
        dataType: 'jsonp'
    }).done(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<tr>");
            newDiv.addClass("event");
            var month = moment(response.data[i].time).format("MMM");
            var day = moment(response.data[i].time).format("DD");
            //console.log(date);
            var colDate = $("<td>");
            var colTxt = $("<td>");
            colDate.addClass("col-md-2");
            colTxt.addClass("col-md-10");
            colDate.html("<p>" + month + "</p><br><p>" + day + "</p>");
            colTxt.html("<p>" + response.data[i].name + "</p><br><a href ='" + response.data[i].link + "'>" + response.data[i].link+"</a>");
            colDate.appendTo(newDiv);
            colTxt.appendTo(newDiv);
            newDiv.appendTo("#eventsTBL");
        }
    })
}