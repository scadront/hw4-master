let updateWidget = function(data) {

  console.log("Get weather data: ", data)
  // YOUR CODE GOES HERE
  jQuery(".card-text").text("It is " + Math.round(data.main.temp) + " degrees outside.")
  jQuery(".card-title").text(data.name)
  // jQuery("#weather img")
  console.log("The icon is: ", data.weather[0].icon)
  let iconString = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  console.log("The icon string is: ", iconString)
  jQuery(".card-img-top.bg-primary.img-fluid").attr("src", iconString)// HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

}

let getWeather = function(info) {
  console.log(info)
  window.myInfo = info

  let latitude = info.coords.latitude.toFixed(4);
  let longitude = info.coords.longitude.toFixed(4);
  let apiKey = '2d9acda28787e53a6ff8d875dc8a940f'; // REPLACE THIS VALUE with your own key.

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  console.log("Starting handlePosition...")
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
  console.log("Ending handle position...")
}

jQuery("#get_forecast").on("click", handlePosition)
////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
