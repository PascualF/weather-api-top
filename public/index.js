const divCelsius = document.querySelector(".temp-celsius")


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
        const getCurrentDay =  getInfo.days[0]
        console.log(`Condition is ${getCurrentDay.conditions}`)
        console.log(`The minimum temperature is ${Math.round(convertFToC(getCurrentDay.tempmin))} °C`)
        console.log(`The minimum temperature is ${Math.round(convertFToC(getCurrentDay.tempmax))} °C`)
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

getWeather()





const convertFToC = (tempF) => {
    return celsius = (tempF - 32) * (5/9)
}
