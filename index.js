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


const http = require('http');
const ejs = require('ejs');
const ejsFile = './templates/index.ejs';

const server = http.createServer((req, res) => {
    ejs.renderFile(ejsFile, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erreur du serveur');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});