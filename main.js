const api = {
  key: "d87615504cc12e3028e7fafb20d1099b",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    // getResults(evt.target.value);
    getResults(searchbox.value);

    // console.log(searchbox.value);
    // console.log(evt.target.value);
  }
}

function getResults(query) {
  fetch(`${api.baseURL}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  const city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  const dateNow = new Date();
  const date = document.querySelector(".location .date");
  date.innerText = dateBuilder(dateNow);

  const temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const myWeather = document.querySelector(".current .weather");
  myWeather.innerText = `${weather.weather[0].main}`;

  const hi_low = document.querySelector(".current .hi-low");
  hi_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
