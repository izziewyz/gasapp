// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Geocoder API
//var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";
var googleapi = "AIzaSyC3RjC3JkvQvfCwfGEt5eY7i3bcPN77jSs";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location,location2) {

    console.log(location);

    // Figure out the geolocation
    //var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+location+ "&destinations=" + location2 + "&key=" + googleapi;
    return axios.get(queryURL).then(function(response) {
      console.log(response.data.rows[0].elements[0].distance.text);
      // If get get a result, return that result's formatted address property
      if (response.data.rows[0].elements[0].distance.text) {
        return response.data.rows[0].elements[0].distance.value;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  runQuery2: function(location,location2) {

    console.log(location);

    // Figure out the geolocation
    //var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+location+ "&destinations=" + location2 + "&key=" + googleapi;
    return axios.get(queryURL).then(function(response) {
      console.log(response.data.rows[0].elements[0].distance.text);
      // If get get a result, return that result's formatted address property
      if (response.data.rows[0].elements[0].distance.text) {
        return response.data.rows[0].elements[0].distance.value;
      }
      // If we don't get any results, return an empty string
      return "";
    });

  },



// Helper functions for making API Calls


  // This function serves our purpose of running the query to geolocate.
  runQuery3: function(location) {

    console.log(location);

    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].components.postcode;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },






  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  getHistoryS: function() {
    return axios.get("/apisearch");
  },

  // This function posts new searches to our database.
  postHistory: function(username,contact,location1,location2,distancebetween) {
    return axios.post("/api", { username: username, contact: contact, location1: location1, location2:location2, distancebetween:distancebetween });
  }
};

// We export the API helper
module.exports = helper;
