function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2"> 
             <ul>
                <li> 
                  <div class="weather-forecast-date">
                     ${formatDay(forecastDay.dt)}
                    </div>
                  </li>
        
              <li>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="42"/>
              </li>
              <li> 
                <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                  ${Math.round(forecastDay.temp.max)}°C
                </span> 
                <span class="weather-forecast-temperature-min">
                ${Math.round(forecastDay.temp.min)}°C</span>
              </div>
              </li>
            </ul>
            
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c4db4a0bb29288a24feb8d1fd9d4368e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let teperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let cloudsElement = document.querySelector("#clouds");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  teperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cloudsElement.innerHTML = response.data.clouds.all;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c4db4a0bb29288a24feb8d1fd9d4368e";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Tokyo");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
