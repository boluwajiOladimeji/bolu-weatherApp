const api = {
  key: '9ae6e6b45b5cf965b3b720c146cabd4d',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const search = document.querySelector('.input');
const error = document.querySelector('.error');

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', getSearchValue);

// Get search input value
function getSearchValue(e) {
  e.preventDefault();
  let searchedCity = search.value;
  if (!searchedCity) {
    loadError('Please enter a city name');
    return;
  }
  loadData();
}

// Fetch Weather data
const getData = async () => {
  const resp = await fetch(
    `${api.base}weather?q=${search.value}&units=metric&APPID=${api.key}`
  );
  const data = await resp.json();
  return data;
};

// Load weather on UI
const loadData = async function () {
  const data = await getData();
  if (data.cod === '404') {
    loadError('Please enter a valid city');
    return;
  }
  displayData(data);
};

// Load error
function loadError(content) {
  error.textContent = content;
  error.classList.remove('hidden');
  search.value = '';
  setTimeout(() => {
    error.classList.add('hidden');
  }, 4000);
}

const city = document.querySelector('.city');
const today = new Date();
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const tempDetail = document.querySelector('.temp-detail');
const tempRange = document.querySelector('.temp-range');
const weatherIcon = document.querySelector('.icon');
const iconURL = 'http://openweathermap.org/img/w/';

// Display data
function displayData(data) {
  console.log(data);
  weatherIcon.src = iconURL + data.weather[0].icon + '.png';
  city.innerText = `${data.name}, ${data.sys.country}`;
  date.innerText = dateFunction(today);
  temp.innerHTML = `${Math.round(data.main.temp)} ℃`;
  tempDetail.innerText = `${data.weather[0].main}`;
  tempRange.innerText = `${Math.round(data.main.temp_min)} ℃ / ${Math.round(
    data.main.temp_max
  )} ℃`;
}

function dateFunction(d) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

(function init() {
  search.value = 'lagos';
  loadData();
  search.value = '';
})();
