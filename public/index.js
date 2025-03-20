const divCelsius = document.querySelector(".temp-celsius")
const divF = document.querySelector(".temp-fahr")
const conditionParagraph = document.querySelector(".condition-current")
const btnConfirm = document.querySelector("button")
const inputUser = document.querySelector("input")
const iconWeather = document.querySelector(".weather-icon")
const titleCity = document.querySelector(".city-title")
const cityDefault = 'Brussels'

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
            currentTemp : getCurrentDay.temp
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
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

displayWeather()

btnConfirm.addEventListener('click', () => {
    
    // Get User Input
    const valueUser = inputUser.value

    console.log(valueUser)
    if(valueUser === ''){
        displayWeather()
    } else {
        displayWeather(valueUser)
    }
})



const convertFToC = (tempF) => {
    return celsius = (tempF - 32) * (5/9)
}