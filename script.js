const getWeatherFrom = async(country,city)=>{
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+','+country+'&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    const responseWeatherStats = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const weatherData = await responseWeatherStats.json();
    return weatherData;
}
getWeatherFrom('Argentina','Buenos Aires').then(data => {
    console.log(data);
})