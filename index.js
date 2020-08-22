function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function getWeather(response) {
  let tempF = document.querySelector("#temp");
  let currentCity = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let country = document.querySelector("#country");
  let city = response.data.name;
  let temp = response.data.main.temp;
  let icon = document.querySelector("#icon");
  console.log(response.data);
  console.log(response.data.name);
  fernTemp = response.data.main.temp;
  currentCity.innerHTML = city;
  tempF.innerHTML = Math.round(fernTemp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  country.innerHTML = response.data.sys.country;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(city);
}

function celTempConversion(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temp");
  celTemp = (fernTemp - 32) * (5 / 9);
  fernLink.classList.remove("active");
  celLink.classList.add("active");
  tempC.innerHTML = Math.round(celTemp);
}

function fernTempConversion(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temp");
  celLink.classList.remove("active");
  fernLink.classList.add("active");
  let fernTemp = (celTemp * 9) / 5 + 32;
  tempF.innerHTML = Math.round(fernTemp);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let hours = time[date.getHours()];
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (date.getHours() <= 11 || date.getHours() === 24) {
    return `${hours}:${minutes} AM`;
  } else {
    return `${hours}:${minutes} PM`;
  }
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let i = 0; i < 6; i++) {
    forecast = response.data.list[i];
    forecastElement.innerHTML += `<div class="col" id="forecastImg"><div class="col-2">
    <h4>${formatHours(forecast.dt * 1000)}</h4>
    <img  src="http://openweathermap.org/img/wn/${
      response.data.list[i].weather[0].icon
    }@2x.png" alt="" id="icon" />
      <div class="weather-forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(
      forecast.main.temp_min
    )}°
    </div></div></div>`;
  }
}
function search(city) {
  let apiKey = "4c362e7f4f84ef4ab0ee164594102485";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=imperial`)
    .then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form");
  search(searchInput.value);
}

search("Los Angeles");
let fernTemp = null;
let celTemp = null;
let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let celLink = document.querySelector("#celLink");
celLink.addEventListener("click", celTempConversion);

let fernLink = document.querySelector("#fernLink");
fernLink.addEventListener("click", fernTempConversion);

function click() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(response) {
  let apiKey = "4c362e7f4f84ef4ab0ee164594102485";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    )
    .then(getWeather);
}

function getForecast(city) {
  let apiKey = "4c362e7f4f84ef4ab0ee164594102485";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", click);
