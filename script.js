const KELVIN = 273;
const key = '5f88cc0ee2aac21d465d480c160abd04';

async function fetchAPI(lat, lon) {
   // const api = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}`;
   const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
   let response = await fetch(api);
   let result = await response.json();

   rendemWeatherData(result);
   console.log(result);
}

function rendemWeatherData(data) {
   console.log(data);

   let cart = '';
   for (let i = 0; i < data.list.length; i += 8) {
      const tempElement = Math.floor(data.list[i].main.temp - KELVIN);
      const tempMin = Math.floor(data.list[i].main.temp_min - KELVIN);
      const tempMax = Math.floor(data.list[i].main.temp_max - KELVIN);

      let mydate = new Date(data.list[i].dt_txt);
      const month = [
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
      ][mydate.getMonth()];
      const day = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday',
      ][mydate.getDay()];
      const str = `${mydate.getDate()}. ${month}`;
      console.log(str);

      console.log(data.list[i].weather[0].icon);
      console.log(data.list[i].weather[0].description);
      console.log(data.list[i].dt_txt);
      console.log(tempElement);
      cart += `<div class="cart">
      <div class="container">
      <div class="app-title">
            <p>${day}</p>
         </div>
         <div class="notification"></div>
         <div class="weather-container">
            <div class="weather-icon">
               <img src="icons/${data.list[i].weather[0].icon}.png"/>
            </div>
            <div class="temperature-value">
               <p>${tempElement}°<span>C</span></p>
            </div>
            <div class="temperature-description">
               <p>${data.list[i].weather[0].description}</p>
            </div>
            <div class="wind-speed">
              
                <p>Max: ${tempMax}°C</p>
               <p>Min: ${tempMin}°C</p>
            </div>
            <div class="sunrise-and-sunset">
               <p></p>
            </div>
         </div>
         </div>
         </div>`;
   }

   const root = document.querySelector('.cart');
   root.innerHTML = cart;
   return root;
}

navigator.geolocation.watchPosition((position) => {
   position;

   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   console.log(lat, lon);
   fetchAPI(lat, lon);
});
let preloader = document.querySelector('.loader-wrapper');
function loaderPage() {
   setTimeout(() => {
      preloader.style.display = 'none';
   }, 1600);
}
