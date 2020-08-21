function formatDate(timestamp) {
  let date = new Date(timestamp);

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let time = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  let day = days[date.getDay()];
  let hours = time[date.getHours()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let displayDate;
  if (date.getHours() <= 11 || date.getHours() === 24) {
    displayDate = `${day} ${hours}:${minutes} AM`;
  } else {
    displayDate = `${day} ${hours}:${minutes} PM`;
  }
  return displayDate;
}
// let updateCity = document.querySelector("#currentCity");
// let latitude;
// let longitude;
let city = "Los Angeles";
let apiKey = "4c362e7f4f84ef4ab0ee164594102485";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

// function search(event) {
//   event.preventDefault();
//   let today = new Date();

//   let searchInput = document.querySelector("#form");
//   let searchInputToLower = searchInput.value
//     .toLowerCase()
//     .replace(/\b[a-z]/g, function (letter) {
//       return letter.toUpperCase();
//     });
//   if (searchInputToLower) {
//     updateCity.innerHTML = searchInputToLower;
//   } else {
//     updateCity.innerHTML = `Please type a city...`;
//   }
//   searchWeather(searchInputToLower);
// }

// function handlePosition(response) {
//   latitude = response.coords.latitude;
//   longitude = response.coords.longitude;
//   axios
//     .get(
//       `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
//     )
//     .then(getWeather);
// }

function getWeather(response) {
  console.log(response.data);
  let tempF = document.querySelector("#temp");
  let currentCity = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  // let form = document.querySelector("#search-bar");
  // let tempC = document.querySelector("#temp");
  let dateElement = document.querySelector("#date");
  let country = document.querySelector("#country");
  let city = response.data.name;
  let temp = response.data.main.temp;

  // form.addEventListener("submit", search);
  // tempC.addEventListener("click", changeTemp);
  currentCity.innerHTML = city;
  tempF.innerHTML = Math.round(temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  country.innerHTML = response.data.sys.country;
}

axios.get(`${apiUrl}q=${city}&appid=${apiKey}&units=imperial`).then(getWeather);
// function searchWeather(response) {
//   axios
//     .get(`${apiUrl}q=${response}&appid=${apiKey}&units=imperial`)
//     .then(getSearchWeather);
// }

// function getSearchWeather(response) {
//   let tempF = document.querySelector("#temp");
//   let temp = response.data.main.temp;
//   tempF.innerHTML = Math.round(temp);
// }

// function changeTemp(event) {
//   event.preventDefault();
//   tempC.innerHTML = "28.3";
// }
// function click() {
//   navigator.geolocation.getCurrentPosition(handlePosition);
// }
// let currentLocation = document.querySelector("#currentLocation");
// currentLocation.addEventListener("click", click);
// window.addEventListener("load", getWeather);
