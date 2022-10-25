const countryInput = document.querySelector('#country');
const cityInput = document.querySelector('#city');

const getWeatherFrom = async(country,city)=>{
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+','+country+'&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    const responseWeatherStats = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const weatherData = await responseWeatherStats.json();
    return weatherData;
}
const getWeather = (e)=>{
    e.preventDefault();
    const country = countryInput.value;
    const city = cityInput.value;
    getWeatherFrom(country,city).then(data => {
        console.log(data);
        console.log(data.main.feels_like);
    });
}

const searchWeatherBtnUser = document.querySelector('#search-btn');
searchWeatherBtnUser.addEventListener('click',getWeather);