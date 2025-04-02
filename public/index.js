const divCelsius = document.querySelector(".temp-celsius")
const divF = document.querySelector(".temp-fahr")
const conditionParagraph = document.querySelector(".condition-current")
const btnConfirm = document.querySelector("button")
const inputUser = document.querySelector("input")
const iconWeather = document.querySelector(".weather-icon")
const titleCity = document.querySelector(".city-title")
const nextHours = document.querySelector(".next-hours")
const nextDays = document.querySelector(".next-days")
const currentHumid = document.querySelector("#humid-p")
const currentWind = document.querySelector("#wind-p")
const cityDefault = 'Brussels';
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const convertFToC = (tempF) => {
    return celsius = (tempF - 32) * (5/9)
}

const getApiKey = async () => {
    try{
        const response = await fetch('/config')
        const keyAPI = await response.json()
        return keyAPI.apiKey; // return the API key
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const iconsObject = {
    'Clear': './icons/sun.png',
    'Rain, Partially cloudy': './icons/rain.png',
    'Overcast': './icons/dark.png',
    'Partially cloudy': './icons/cloudy.png'
}

const getWeather = async (city = cityDefault) => {
    try{
        const apiKey = await getApiKey()
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`)
        const getInfo = await response.json()
        const getCurrentDay = getInfo.currentConditions
        titleCity.textContent = city
        return {
            currentCondition : getCurrentDay.conditions,
            currentTemp : getCurrentDay.temp,
            currentHumidity: getCurrentDay.humidity,
            currentWind: getCurrentDay.windspeed,
            weatherInfo: getInfo
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const displayWeather = async (userInput = cityDefault) => {
    try{
        const currentWeather = await getWeather(userInput)
        conditionParagraph.textContent = currentWeather.currentCondition
        iconWeather.src = iconsObject[currentWeather.currentCondition]
        divCelsius.textContent = `${Math.round(convertFToC(currentWeather.currentTemp))} °C`
        divF.textContent =  `${Math.round(currentWeather.currentTemp)} °F`
        currentHumid.textContent = `${Math.round(currentWeather.currentHumidity)} %`
        currentWind.textContent = `${Math.round(currentWeather.currentWind)} km/h`
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

/* const d = new Date();
let hours = d.getHours()
 */

const displayWeatherNextHours = async (userInput = cityDefault) => {
    const weatherInfo = await getWeather(userInput)
    console.log(weatherInfo.weatherInfo.days[0])
    const hourlyInfoWeather = weatherInfo.weatherInfo.days[0]

    // Get the current hour
    const date = new Date()
    let hours = date.getHours()
    nextHours.innerHTML = ``
    for (let i=0; i < 6; i++){
        hours++
        const nextHourInfos = hourlyInfoWeather.hours[hours]
        /* console.log(nextHourInfos) */
        nextHours.innerHTML += `
            <div class="hourly-div">
                <p>${hours}h</p>
                <img src=${iconsObject[nextHourInfos.conditions]} class="hours-icon">
                <p></p>
                <p class="hours-temp-c">${Math.round(convertFToC(nextHourInfos.temp))}°c</p>
                <p class="hours-temp-f">${Math.round(nextHourInfos.temp)}°f</p>
            </div>
        `  
    }
}

const displayWeatherNextDays = async (userInput = cityDefault) => {
    const weatherInfo = await getWeather(userInput);
    const dailyWeather = weatherInfo.weatherInfo.days
    nextDays.innerHTML = ``


    for (let i = 1; i < 7; i ++){
        
        const nextDayInfo = dailyWeather[i]
        const date = new Date(nextDayInfo.datetime).getDay();
        console.log(date)
        nextDays.innerHTML += `
            <div class="hourly-div">
                <p>${dayName[date]}</p>
                <p>${nextDayInfo.datetime.slice(5)}</p>
                <img src=${iconsObject[nextDayInfo.conditions]} class="hours-icon">
                <p></p>
                <p class="hours-temp-c">${Math.round(convertFToC(nextDayInfo.temp))}°c</p>
                <p class="hours-temp-f">${Math.round(nextDayInfo.temp)}°f</p>
            </div>
        `
    }
}

displayWeatherNextDays()

const updateWeather = async (city = cityDefault) => {
    try {
        const weatherData = await getWeather(city);
        if(!weatherData) return; // Handle potential API errors

        displayWeather(weatherData.weatherInfo.address);
        displayWeatherNextHours(weatherData.weatherInfo.address);
    } catch (err) {
        console.log(`Error: ${err}`)
    }
} 

updateWeather();
btnConfirm.addEventListener('click', () => {
    
    // Get User Input
    const valueUser = inputUser.value

    if(valueUser === ''){
        displayWeather()
        displayWeatherNextHours()
    } else {
        displayWeather(valueUser)
        displayWeatherNextHours(valueUser)
        inputUser.value = ""
    }

})