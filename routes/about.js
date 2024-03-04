const express = require("express");
const properties = require("../package.json");
var path = require('path');

const aboutRoute = express.Router();

aboutRoute.get("/", (req, res) => {
    const aboutInfo = {
        name: properties.name,
        description: properties.description,
        author: properties.author
    }
    res.render(path.join(__dirname, '../templates/') + "about.ejs", aboutInfo)
})

module.exports = aboutRoute