const divCelsius = document.querySelector(".temp-celsius")
const conditionParagraph = document.querySelector(".condition-current")
const btnConfirm = document.querySelector("button")
const inputUser = document.querySelector("input")
const iconWeather = document.querySelector(".weather-icon")

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
    'Clear': './icons/clear-sky.png',
    'Rain, Partially cloudy': './icons/rain.png',
    'Overcast': './icons/dark.png',
    'Partially cloudy': './icons/cloudy.png'
}

const getWeather = async (city = 'brussels') => {
    try{
        const apiKey = await getApiKey()
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`)
        const getInfo = await response.json()
        const getCurrentDay = getInfo.currentConditions
        return {
            currentCondition : getCurrentDay.conditions,
            currentTemp : getCurrentDay.temp
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const displayWeather = async () => {
    try{
        console.log('working')
        const currentWeather = await getWeather()
        console.log(currentWeather)
        conditionParagraph.textContent = currentWeather.currentCondition
        console.log(iconsObject)
        console.log(iconsObject['Overcast'])
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

getWeather()

btnConfirm.addEventListener('click', () => {
    displayWeather()
})



const convertFToC = (tempF) => {
    return celsius = (tempF - 32) * (5/9)
}
