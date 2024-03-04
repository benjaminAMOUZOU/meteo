const express = require("express");
const https = require('https')
var path = require('path');

const weatherRoute = express.Router();
weatherRoute.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../') + "index.html");
})

weatherRoute.post("/", (req, res) => {
    const city = req.body.cityName
    const appiKey = "3972594e26757a87efbf3101795c78dc"
    const unit = req.body.unit

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appiKey + "&units=" + unit + ""
    https.get(url, (response) => {
        response.on("data", (chunk) => {
            const responseData = JSON.parse(chunk);
            const temperature = responseData.main.temp;
            const weatherDes = responseData.weather[0].description;
            const icon = responseData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const cityName = responseData.name;
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(`&lt;h1&gt;Il fait ${temperature} degree celsius à ${cityName} et l'image corresponante est  ${weatherDes} &lt;/h1&gt;`)
            // res.write("&lt;img src=" + imageURL + "&gt;")
            // res.send()
            res.sendFile(path.join(__dirname, '../') + "weather.html",
                {
                    temperature: temperature,
                    weatherDes: weatherDes,
                    icon: icon,
                    imageURL: imageURL,
                    cityName: cityName
                }
            );
        })
    })
})

module.exports = weatherRoute