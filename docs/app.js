const arrOfDays=[{0:"Sunday"},{1:"Monday"},{2:"Tuesday"},{3:"Wednesday"},{4:"Thursday"},{5:"Friday"},{6:"Saturday"}];document.querySelector(".weather-out").innerHTML='<div style="font-size: 3.5rem">--</div>',document.querySelector(".title").innerHTML="Please Enter your City (US cities only)";const getWeather=()=>{let e=document.querySelector(".city").value;console.log("city =",e),fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e},us&appid=a53130cd66281fe281431da75fa09d0e&units=imperial&cnt=40`).then(e=>e.json()).then(t=>{let n=[],a=new Date(1e3*t.list[0].dt);t.list.filter(e=>{new Date(1e3*e.dt).getHours()===a.getHours()&&n.push(e)}),console.log(n.length);let r="",o=`${e.charAt(0).toUpperCase()}${e.slice(1)}`;n.forEach(function(e,t){console.log(Object.values(arrOfDays[new Date(1e3*e.dt).getDay()])),0===t?(document.querySelector(".title").innerHTML=`Five Day Forecast for ${o}`,r=`\n        <div class="current-weather">\n        <h3 class="day">${Object.values(arrOfDays[new Date(1e3*e.dt).getDay()])}</h3>\n        <p class="temp">${Math.round(e.main.temp)}&#176F</p>\n        <p class="description">${e.weather[0].description}</p>\n        <img class="icon" src="http://openweathermap.org/img/w/${e.weather[0].icon}.png" alt="weather icon"/>\n      </div>\n        `):(console.log("list",e,t),r+=`\n            <div class="card">\n              <h3 class="day">${Object.values(arrOfDays[new Date(1e3*e.dt).getDay()])}</h3>\n              <p class="temp">${Math.round(e.main.temp_max)}&#176F ${Math.round(e.main.temp_min)}&#176F</p>\n              <p class="description">${e.weather[0].description}</p>\n              <img class="icon" src="http://openweathermap.org/img/w/${e.weather[0].icon}.png" alt="weather icon"/>\n            </div>\n            `)}),document.querySelector(".weather-out").innerHTML=r})};window.addEventListener("keyup",e=>{13===e.keyCode&&cityInput.length>1&&(getWeather(),console.log("pressing enter"))});const buttonClick=()=>{city=document.querySelector(".city").value,city.length>1?getWeather():document.querySelector(".title").innerHTML="Please enter a valid US City"};