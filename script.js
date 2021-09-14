// define
var searchButton = document.querySelector("#searchButton");
var temp = document.querySelector("#temp");
var windSpeed = document.querySelector("#windSpeed");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uvIndex");
var currentCity = document.querySelector("#currentCity");
var cityArray = JSON.parse(localStorage.getItem("cities")) || [];

const API_KEY = "334c01a4d97ca0eb69ae35cd9791f753";

var currentTime = new Date();

// function startUp() {
//   recentSearchHistory();
//   // add cityName to cityArray
//   cityArray.unshift(cityName);
//   // save cityArray to local storage
//   localStorage.setItem("cities", JSON.stringify(cityArray));

//   // use OpenWeather current API to get the latitude & longitude of the city
//   var apiUrl =
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//     "chicago" +
//     "&appid=" +
//     API_KEY +
//     "&units=imperial";

//   var lat;
//   var lon;

//   fetch(apiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (res) {
//       lat = res.coord.lat;
//       lon = res.coord.lon;
//       console.log(res);
//       getWeatherData(lat, lon);
//     });
// }

function init() {
  // read past cities from local storage
  // cityArray = JSON.parse(localStorage.getItem("cities")) || [];
  // TODO: call recentSearchHistory
  // startUp();
  // add click event listener to search button
  searchButton.addEventListener("click", function () {
    // get weather data upon click of search
    recentSearchHistory();
    getLatLon();
    // var recentSearchLiButton = document.querySelector(".recSearchBtn");
    // recentSearchLiButton.addEventListener("click", getLatLon());
  });
}

function recentSearchHistory() {
  
  // get reference to ul using id name & assign it to a variable
  var recentSearchUl = document.querySelector("#recentSearches");
  $("#recentSearches").children("button").remove();
  cityArray = cityArray.splice(0, 5);
  
  // TODO: for loop to iterate through cityArray
  for (var i = 0; i < 5; i++) {
    // TODO: create <li> element using document.createElement & assign it to a variable
    var recentSearchLi = document.createElement("button");
    recentSearchLi.classList.add('list-group-item', 'btn', 'recSearchBtn', 'name-city');
    recentSearchLi.setAttribute('type', 'button');
    recentSearchLi.setAttribute('value', cityArray[i])
    // TODO: set its innerHTML to cityArray[i] value at current index
    recentSearchLi.innerHTML = cityArray[i];
    // TODO: append new <li> element to <ul> element using .appendChild
    recentSearchUl.appendChild(recentSearchLi); 
  }
  // $('.name-city').on('click', newRecSearch());
}

function newRecSearch() {
    // retrieve the name of the city that was entered in the input field
    // var recSearchName = event.target.value;
    // console.log('test')
    // recentSearchLi.addEventListener('click', function () {
    //   console.log(recSearchName);
    //   getLatLon();
    // }); 
  
    // use OpenWeather current API to get the latitude & longitude of the city
    // var apiUrl =
    //   "http://api.openweathermap.org/data/2.5/weather?q=" +
    //   recSearchName +
    //   "&appid=" +
    //   API_KEY +
    //   "&units=imperial";
  
    // var lat;
    // var lon;
  
    // fetch(apiUrl)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (res) {
    //     lat = res.coord.lat;
    //     lon = res.coord.lon;
    //     console.log(res);
    //     getWeatherData(lat, lon);
    //   });

}

function getLatLon() {
  // retrieve the name of the city that was entered in the input field
  var cityName = document.querySelector("#cityName").value;
  // add cityName to cityArray
  cityArray.unshift(cityName);
  // save cityArray to local storage
  localStorage.setItem("cities", JSON.stringify(cityArray));

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
      // console.log(res);
      getWeatherData(lat, lon);
    }); 
}

function getWeatherData(lat, lon) {
  // console.log (lat, lon)

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

        var apiIcon,tempVal,windVal,humidVal,dateVal,dailyWeatherData;
        for (var i = 0; i < 5; i++) {
          dailyWeatherData = data.daily[i];
          apiIcon = dailyWeatherData.weather[0].icon;
          tempVal = dailyWeatherData.temp.max;
          windVal = dailyWeatherData.wind_speed;
          humidVal = dailyWeatherData.humidity;
          dateVal = convertEpochToGMT(dailyWeatherData.dt);
          document.querySelector("#tempDay" + (i+1)).innerHTML = 'Temp: ' + tempVal + '&#8457';
          document.querySelector("#windDay" + (i+1)).innerHTML = 'Wind Speed: ' + windVal;
          document.querySelector("#humidityDay" + (i+1)).innerHTML = 'Humidity: ' + humidVal + '%';;
          document.querySelector('#iconDay' + (i+1)).src = "http://openweathermap.org/img/wn/" + apiIcon + "@2x.png";
          document.querySelector('#day' + (i+1)).innerHTML = dateVal;
        }
        if (uviValue < 5) {
          uvIndex.classList.add('btn-success');
          uvIndex.classList.remove('btn-danger', 'btn-warning');
        } else if (uviValue > 4 && uviValue < 8) {
          // uvIndex.classList.remove("btn-success", "btn-danger");
          uvIndex.classList.add('btn-warning');
          uvIndex.classList.remove('btn-success', 'btn-danger');
        } else if (uviValue > 7) {
          // uvIndex.classList.remove("btn-success", "btn-warning");
          uvIndex.classList.add('btn-danger');
          uvIndex.classList.remove('btn-success', 'btn-warning');
        } else {
        }

        document.querySelector('#currentDate').innerHTML = convertEpochToGMT(data.current.dt);
        currentCity.innerHTML = cityName.value;
        temp.innerHTML = 'Temp: ' + tempValue + '&#8457';
        windSpeed.innerHTML = 'Wind Speed: ' + windValue;
        humidity.innerHTML = 'Humidity: ' + humidityValue + '%';
        uvIndex.innerHTML = 'UV Index: ' + uviValue;
        document.querySelector('#icon').src = "http://openweathermap.org/img/wn/" + apiIconCurrent + "@2x.png";
    })
    // recentSearchHistory();
  // use OpenWeather One Call API and pass the latitude & longitude to get the current weather
  // and 5 day forecast data
}

function convertEpochToGMT(unixTime) {
  var utcSeconds = unixTime;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return (d.toLocaleString().split(',')[0]);

}

// function saveRecentSearch() {
  

// }

init();
$('.name-city').on('click', newRecSearch());

