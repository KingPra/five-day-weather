const arrOfDays = [
  { 0: "Sunday" },
  { 1: "Monday" },
  { 2: "Tuesday" },
  { 3: "Wednesday" },
  { 4: "Thursday" },
  { 5: "Friday" },
  { 6: "Saturday" }
];

document.querySelector(
  ".weather-out"
).innerHTML = `<div style="font-size: 3.5rem">--</div>`;
document.querySelector(".title").innerHTML =
  "Please Enter your City (US cities only)";

const getWeather = () => {
  const API_KEY = "a53130cd66281fe281431da75fa09d0e";
  let city = document.querySelector(".city").value;
  let country = "us";

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&appid=${API_KEY}&units=imperial&cnt=6`
  )
    .then(response => response.json())
    .then(data => {
      let output = "";
      let capitalized = `${city.charAt(0).toUpperCase()}${city.slice(1)}`;

      data.list.forEach(function(list, key) {
        key === 0
          ? ((document.querySelector(
              ".title"
            ).innerHTML = `Five Day Forecast for ${capitalized}`),
            (output = `
            <div class="current-weather">
            <h3 class="day">${Object.values(
              arrOfDays[new Date(list.dt * 1000).getDay()]
            )}</h3>
            <p class="temp">${Math.round(list.temp.day)}&#176F</p>
            <p class="description">${list.weather[0].description}</p>
            <img class="icon" src="https://openweathermap.org/img/w/${
              list.weather[0].icon
            }.png" alt="weather icon"/>
          </div>
            `))
          : (output += `
                <div class="card">
                  <h3 class="day">${Object.values(
                    arrOfDays[new Date(list.dt * 1000).getDay()]
                  )}</h3>
                  <p class="temp">${Math.round(
                    list.temp.max
                  )}&#176F ${Math.round(list.temp.min)}&#176F</p>
                  <p class="description">${list.weather[0].description}</p>
                  <img class="icon" src="https://openweathermap.org/img/w/${
                    list.weather[0].icon
                  }.png" alt="weather icon"/>
                </div>
                `);
      });
      document.querySelector(".weather-out").innerHTML = output;
    });
};

window.addEventListener("keyup", e => {
  city = document.querySelector(".city").value;
  if (e.keyCode === 13 && city.length > 1) {
    getWeather();
  }
});

const buttonClick = () => {
  city = document.querySelector(".city").value;
  city.length > 1
    ? getWeather()
    : (document.querySelector(".title").innerHTML =
        "Please enter a valid US City");
};
