const countryInput = document.querySelector('#country');
const weatherContainer = document.querySelector('.weather-container');
const clearInputs = (input)=>{ input.value = ''}

const getWeatherFrom = async(location)=>{ //Functions declared as a async function ALWAYS return a promise.
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&appid=c0a13cade9d5eb56c747b5fd429be5de')
    const weatherData = await response.json();
    return weatherData; //When there's not problem with the fetched data from outside servers then return this.
}
const promise1 = getWeatherFrom('Argentina');// getWeatherFrom returns a promise.
//If we want to get the data from what returns getWeatherFrom then we have to work as we working with promises.
//We have to use .then to handle with promises outside of async functions.
//Remember that's not okay to use wait ouside an async functions!
const roundNumberToTwoDecimals = (number)=>{return Math.round(number * 100) / 100}
const displayWeatherToPage= (weatherData)=>{
    let state = false;
    const countryNameTitle = document.createElement('h1');
    const dataContainer = document.createElement('div');
    const temp = document.createElement('p');
    const minTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const humidity = document.createElement('p');
    const feelsLike = document.createElement('p');
    weatherContainer.appendChild(countryNameTitle);
    countryNameTitle.textContent= weatherData.name +' Current Weather';
    weatherContainer.appendChild(dataContainer);
    dataContainer.className='weather-stats-container';
    dataContainer.appendChild(temp);
    dataContainer.appendChild(maxTemp);
    dataContainer.appendChild(minTemp);
    dataContainer.appendChild(humidity);
    dataContainer.appendChild(feelsLike);
    feelsLike.textContent='Feels like: '+ weatherData.main.feels_like+' °C';
    temp.textContent='Temp: '+ weatherData.main.temp+' °C';
    maxTemp.textContent = 'Max Temp: '+ weatherData.main.temp_max+' °C';
    minTemp.textContent = 'Min Temp: '+ weatherData.main.temp_min+' °C';
    humidity.textContent = 'Humidity: '+ weatherData.main.humidity;
    const toogleBtn = createToogleButton(dataContainer);
    toogleBtn.addEventListener('click',()=>{
        if(state){
            feelsLike.textContent='Feels like: '+ weatherData.main.feels_like+' °C';
            temp.textContent='Temp: '+ weatherData.main.temp+' °C';
            maxTemp.textContent = 'Max Temp: '+ weatherData.main.temp_max+' °C';
            minTemp.textContent = 'Min Temp: '+ weatherData.main.temp_min+' °C';
            state=false;
        }else{
            maxTemp.textContent = 'Max Temp : '+ roundNumberToTwoDecimals(weatherData.main.temp_max*1.8+32)+' °F';
            minTemp.textContent = 'Min Temp : '+ roundNumberToTwoDecimals(weatherData.main.temp_min*1.8+32)+' °F';
            temp.textContent = 'Temp: '+ roundNumberToTwoDecimals(weatherData.main.temp*1.8+32)+' °F';
            feelsLike.textContent = 'Feels like: '+ roundNumberToTwoDecimals(weatherData.main.feels_like*1.8+32)+' °F';
            state = true;
        }

    })
}
const getWeather = (e)=>{
    e.preventDefault();
    const location = countryInput.value;
    getWeatherFrom(location).then(data => {
        console.log(data);
        displayWeatherToPage(data);
    });
    clearInputs(countryInput);
}
const createToogleButton = (container)=>{
    const toogleBtn = document.createElement('button');
    toogleBtn.textContent = 'Toogle weather value';
    container.appendChild(toogleBtn);
    return toogleBtn;
}

const searchWeatherBtnUser = document.querySelector('#search-btn');
searchWeatherBtnUser.addEventListener('click',getWeather);