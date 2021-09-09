// define
var searchButton = document.querySelector("#searchButton");
var temp = document.querySelector("#temp");
var windSpeed = document.querySelector("#windSpeed");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uvIndex");
var currentCity = document.querySelector("#currentCity");

var tempDayOne = document.querySelector("#tempDayOne");
var windDayOne = document.querySelector("#windDayOne");
var humDayOne = document.querySelector("#humidityDayOne");

var tempDayTwo = document.querySelector("#tempDayTwo");
var windDayTwo = document.querySelector("#windDayTwo");
var humDayTwo = document.querySelector("#humidityDayTwo");

var tempDayThree = document.querySelector("#tempDayThree");
var windDayThree = document.querySelector("#windDayThree");
var humDayThree = document.querySelector("#humidityDayThree");

var tempDayFour = document.querySelector("#tempDayFour");
var windDayFour = document.querySelector("#windDayFour");
var humDayFour = document.querySelector("#humidityDayFour");

var tempDayFive = document.querySelector("#tempDayFive");
var windDayFive = document.querySelector("#windDayFive");
var humDayFive = document.querySelector("#humidityDayFive");

const API_KEY = "334c01a4d97ca0eb69ae35cd9791f753";

var currentTime = new Date();

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
    API_KEY +
    "&units=imperial";

  var lat;
  var lon;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      lat = res.coord.lat;
      lon = res.coord.lon;
      console.log(res);
      getWeatherData(lat, lon);
    });
}

function getWeatherData(lat, lon) {
  console.log (lat, lon)

  var apiUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  API_KEY +
  "&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var tempValue = data.current.temp;
        var windValue = data.current.wind_speed;
        var humidityValue = data.current.humidity;
        var uviValue = data.current.uvi;
        var apiIconCurrent = data.current.weather[0].icon;

        var apiIconDayOne = data.daily[0].weather[0].icon;
        var tempValDayOne = data.daily[0].temp.max;
        var windValDayOne = data.daily[0].wind_speed;
        var humidValDayOne = data.daily[0].humidity;

        var apiIconDayTwo = data.daily[1].weather[0].icon;
        var tempValDayTwo = data.daily[1].temp.max;
        var windValDayTwo = data.daily[1].wind_speed;
        var humidValDayTwo = data.daily[1].humidity;

        var apiIconDayThree = data.daily[2].weather[0].icon;
        var tempValDayThree = data.daily[2].temp.max;
        var windValDayThree = data.daily[2].wind_speed;
        var humidValDayThree = data.daily[2].humidity;

        var apiIconDayFour = data.daily[3].weather[0].icon;
        var tempValDayFour = data.daily[3].temp.max;
        var windValDayFour = data.daily[3].wind_speed;
        var humidValDayFour = data.daily[3].humidity;

        var apiIconDayFive = data.daily[4].weather[0].icon;
        var tempValDayFive = data.daily[4].temp.max;
        var windValDayFive = data.daily[4].wind_speed;
        var humidValDayFive = data.daily[4].humidity;
        
        currentCity.innerHTML = cityName.value;
        temp.innerHTML = 'Temp: ' + tempValue + '&#8457';
        windSpeed.innerHTML = 'Wind Speed: ' + windValue;
        humidity.innerHTML = 'Humidity: ' + humidityValue + '%';
        uvIndex.innerHTML = 'UV Index: ' + uviValue;
        document.querySelector('#icon').src = "http://openweathermap.org/img/wn/" + apiIconCurrent + "@2x.png";
        
        tempDayOne.innerHTML = 'Temp: ' + tempValDayOne + '&#8457';
        windDayOne.innerHTML = 'Wind Speed: ' + windValDayOne;
        humDayOne.innerHTML = 'Humidity: ' + humidValDayOne + '%';
        document.querySelector('#iconDayOne').src = "http://openweathermap.org/img/wn/" + apiIconDayOne + "@2x.png";

        tempDayTwo.innerHTML = 'Temp: ' + tempValDayTwo + '&#8457';
        windDayTwo.innerHTML = 'Wind Speed: ' + windValDayTwo;
        humDayTwo.innerHTML = 'Humidity: ' + humidValDayTwo + '%';
        document.querySelector('#iconDayTwo').src = "http://openweathermap.org/img/wn/" + apiIconDayTwo + "@2x.png";

        tempDayThree.innerHTML = 'Temp: ' + tempValDayThree + '&#8457';
        windDayThree.innerHTML = 'Wind Speed: ' + windValDayThree;
        humDayThree.innerHTML = 'Humidity: ' + humidValDayThree + '%';
        document.querySelector('#iconDayThree').src = "http://openweathermap.org/img/wn/" + apiIconDayThree + "@2x.png";

        tempDayFour.innerHTML = 'Temp: ' + tempValDayFour + '&#8457';
        windDayFour.innerHTML = 'Wind Speed: ' + windValDayFour;
        humDayFour.innerHTML = 'Humidity: ' + humidValDayFour + '%';
        document.querySelector('#iconDayFour').src = "http://openweathermap.org/img/wn/" + apiIconDayFour + "@2x.png";

        tempDayFive.innerHTML = 'Temp: ' + tempValDayFive + '&#8457';
        windDayFive.innerHTML = 'Wind Speed: ' + windValDayFive;
        humDayFive.innerHTML = 'Humidity: ' + humidValDayFive + '%';
        document.querySelector('#iconDayFive').src = "http://openweathermap.org/img/wn/" + apiIconDayFive + "@2x.png";

    
    })

  // use OpenWeather One Call API and pass the latitude & longitude to get the current weather
  // and 5 day forecast data
}

init();


