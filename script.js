// define
var searchButton = document.querySelector("#searchButton");
const API_KEY = "334c01a4d97ca0eb69ae35cd9791f753";

function init() {
  // add click event listener to search button
  searchButton.addEventListener("click", function () {
    // get weather data upon click of search
    getLatLon();
  });
}

function getLatLon() {
  // retrieve the name of the city that was entered in the input field
  var cityName = document.querySelector("#cityName").value;
  // use OpenWeather current API to get the latitude & longitude of the city
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    API_KEY;
  var lat;
  var lon;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);
      lat = res.coord.lat;
      lon = res.coord.lon;
      getWeatherData(lat, lon);
    });
}

function getWeatherData(lat, lon) {
  console.log(lat);
  console.log(lon);
  // use OpenWeather One Call API and pass the latitude & longitude to get the current weather
  // and 5 day forecast data
}

init();
