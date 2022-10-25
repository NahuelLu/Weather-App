const countryInput = document.querySelector('#country');
const weatherContainer = document.querySelector('.weather-container');
const clearInputs = ()=>{ countryInput.value = '';cityInput.value=''}

const getWeatherFrom = async(location)=>{
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const weatherData = await response.json();
    return weatherData;
}
const displayWeatherToPage= (weatherData)=>{
    const countryNameTitle = document.createElement('h1');
    const dataContainer = document.createElement('div');
    weatherContainer.appendChild(countryNameTitle);
    countryNameTitle.textContent= weatherData.name +' Current Weather';
    weatherContainer.appendChild(dataContainer);
    dataContainer.className='weather-stats-container';
    dataContainer.textContent='Temp: '+ weatherData.main.temp;
}
const getWeather = (e)=>{
    e.preventDefault();
    const location = countryInput.value;
    getWeatherFrom(location).then(data => {
        console.log(data);
        displayWeatherToPage(data);
    });
    clearInputs();
}

const searchWeatherBtnUser = document.querySelector('#search-btn');
searchWeatherBtnUser.addEventListener('click',getWeather);