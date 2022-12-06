const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}



function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `<img class="img"  src="/image/sun.png" alt="">${Math.round(weather.main.temp)}<span>°c</span>`;

  // <img  class="img"  src="/image/temp.png" alt=""></img>

  let pressure = document.querySelector('.current .pressure');
  pressure.innerHTML = `<img class="img1"  src="/image/pressure.png" alt="">${weather.main.pressure}<span>  hPa</span>`;

  let humidity = document.querySelector('.current .humidity');
  humidity.innerHTML = `<img class="img2"  src="/image/humidity.png" alt="">${weather.main.humidity}<span> %</span>`;

  let wind_speed = document.querySelector('.current .wind_speed');
  wind_speed.innerHTML = `<img class="img3"  src="/image/wind_speed.jpg" alt="">${weather.wind.speed}<span>  m/s</span>`;


  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  

  let hilow = document.querySelector('.current .hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;



  // let feels_like = document.querySelector('.current .feels_like');
  // feels_like.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;


  // let cordinates_lat = document.querySelector('.current .cordinates_lat');
  // cordinates_lat.innerHTML = `${weather.coord.lat}<span>° N</span>`;

  // let cordinates_lon = document.querySelector('.current .cordinates_lon');
  // cordinates_lon.innerHTML = `${weather.coord.lon}<span>° E</span>`;

}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


