function displayTemperature(response) {
  console.log(response.data);

  let teperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let cloudsElement = document.querySelector("#clouds");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  teperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cloudsElement.innerHTML = response.data.clouds.all;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
}

let apiKey = "c4db4a0bb29288a24feb8d1fd9d4368e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
