const express = require("express")
const app = express()
require('dotenv').config()


app.use(express.static('public'))
app.get('/config', (req, res) => {
    res.json({apiKey: process.env.WEATHER_API_KEY})
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`))