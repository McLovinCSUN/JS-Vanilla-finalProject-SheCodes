function start() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[today.getDay()];

  document.querySelector("#datetime").innerHTML =
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + today.getDate()).slice(-2) +
    "/" +
    today.getFullYear() +
    " " +
    "<br />" +
    day +
    "<br />" +
    ("0" + today.getHours()).slice(-2) +
    ":" +
    ("0" + today.getMinutes()).slice(-2);

  let form = document.querySelector("#search-bar");
  form.addEventListener("submit", search);

  let tempC = document.querySelector("#temp");
  tempC.addEventListener("click", changeTemp);
}
let updateCity = document.querySelector("#currentCity");
let latitude;
let longitude;
let apiKey = "4c362e7f4f84ef4ab0ee164594102485";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function search(event) {
  event.preventDefault();
  let today = new Date();

  let searchInput = document.querySelector("#form");
  let searchInputToLower = searchInput.value
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  if (searchInputToLower) {
    updateCity.innerHTML = searchInputToLower;
  } else {
    updateCity.innerHTML = `Please type a city...`;
  }
  searchWeather(searchInputToLower);
}

function handlePosition(response) {
  latitude = response.coords.latitude;
  longitude = response.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    )
    .then(getWeather);
}

function getWeather(response) {
  console.log(response.data);
  let tempF = document.querySelector("#temp");
  let currentCity = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let city = response.data.name;
  let temp = response.data.main.temp;
  currentCity.innerHTML = city;
  tempF.innerHTML = Math.round(temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function searchWeather(response) {
  axios
    .get(`${apiUrl}q=${response}&appid=${apiKey}&units=imperial`)
    .then(getSearchWeather);
}

function getSearchWeather(response) {
  let tempF = document.querySelector("#temp");
  let temp = response.data.main.temp;
  tempF.innerHTML = Math.round(temp);
}

function changeTemp(event) {
  event.preventDefault();
  tempC.innerHTML = "28.3";
}
function click() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", click);
window.addEventListener("load", start);
