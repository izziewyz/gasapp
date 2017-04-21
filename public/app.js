
var results = $("#gasresults");
var fromaddress = $("#from");
var toaddress = $("#to");
var distanceshow = $("#distance");


$("#bsubmit").on("click", function() {
  
  var location2 = $("#term1").val();
  var location1 = $("#term2").val();


  distanceserach(location1,location2);

  $.ajax({
    type: "POST",
    url: "/api",
    dataType: "json",
    data: {
      location1: $("#term1").val(),
      location2: $("#term2").val(),
      //distance: distance,
    }
  })
  .done(function(data) {
    console.log(data);
    
    $("#term1").val("");
    $("#term2").val("");
  }
  );
  return false;
  
});

distanceserach = function(location1,location2){
          var gasprice =$("#contact").val();
          var gasprice2 = parseInt(gasprice);
          console.log(gasprice);
          

          var googleapi = "AIzaSyC3RjC3JkvQvfCwfGEt5eY7i3bcPN77jSs"; 

          var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+location1+ "&destinations=" + location2 + "&key=" + googleapi;
           
          $.ajax({ 
            url: queryURL, 
            method: "GET" 
          })
          .done(function(response) {
                console.log(response);
                console.log(response.rows[0].elements[0].distance.text);
                fromaddress.append(response.origin_addresses);
                toaddress.append("<p> " + response.destination_addresses + "</p>");
                distanceshow.append("<p> " + response.rows[0].elements[0].distance.text + "</p>");
                results.append("<p> $" + response.rows[0].elements[0].distance.value*gasprice2/32184 + "</p>");

             });

          
};































// // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data);







//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
