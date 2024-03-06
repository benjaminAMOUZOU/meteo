// const express = require("express");
// const bodyParser = require("body-parser")
// const aboutRouter = require("./routes/about");
// const weatherRouter = require("./routes/weather");

// const PORT = 3000;
// const HOST_NAME = "localhost";

// const app = express();

// app.use(express.static("client"));
// app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/weather", weatherRouter);
// app.use("/", weatherRouter)
// app.use("/about", aboutRouter);

// app.listen(PORT, HOST_NAME, () => {
//     console.log(`Server running at ${HOST_NAME}:${PORT}`)
// })
const https = require('https')
const fastify = require('fastify')({ logger: false })
const axios = require('axios');

fastify.register(require('@fastify/formbody'))

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    },
});

fastify.get("/", (req, reply) => {
    reply.view("/templates/index.ejs");
});

fastify.get("/weather", (req, reply) => {
    reply.view("/templates/index.ejs");
});

fastify.post("/weather", async (req, reply) => {
    const city = req.body.cityName
    const appiKey = "3972594e26757a87efbf3101795c78dc"
    const unit = req.body.unit
    var systeme = "C";
    var responseData, temperature, weatherDes, icon, imageURL, cityName;

    if (unit == "") {
        systeme = "K"
    }

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appiKey + "&units=" + unit + ""

    var response = await axios.get(url);
    responseData = response.data;
    temperature = responseData.main.temp;
    weatherDes = responseData.weather[0].description;
    icon = responseData.weather[0].icon;
    imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    cityName = responseData.name;

    reply.view("/templates/index.ejs",
        {
            temperature: temperature,
            weatherDes: weatherDes,
            icon: icon,
            imageURL: imageURL,
            cityName: cityName,
            unit: unit,
            systeme: systeme
        }
    );
});

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})