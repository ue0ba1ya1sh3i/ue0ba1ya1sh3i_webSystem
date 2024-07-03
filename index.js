//express
const express = require("express");
const expressApp = express();

//http
const http = require("http");
const server = http.createServer(expressApp);

//socket.io
const { Server } = require("socket.io");
const io = new Server(server);

//fs
const fs = require('fs');


//Configuring ejs
expressApp.set("view engine", "ejs");

//Static file settings
expressApp.use('/files', express.static('files'));

//Load json
const settings = JSON.parse(fs.readFileSync('settings.json'));

//pageData
const page = {
    home: [
        ``,
        ``,
        ``
    ]
};

//mainPage
expressApp.get("/", (req, res) => {
    res.render("index", {
        id: "home",
        html: page.home[0],
        css: "<style>" + page.home[1] + "</style>",
        js: "<script> function sendedCode() {" + page.home[2] + "};</script>"
    });
});

//testPage
expressApp.get("/test/:id", (req, res) => {
    if(req.params.id === settings.testPassword) {
        res.render("test");
    } else {
        res.sendStatus(404);
    };
});

//Admin Settings Page
expressApp.get("/admin/:id", (req, res) => {
    if(req.params.id === settings.adminPassword) {
        res.render("admin");
    } else {
        res.sendStatus(404);
    };
});

//otherPages
expressApp.get("/:page", (req, res) => {
    try {
        res.render("index", {
            id: req.params.page,
            html: page[req.params.page][0],
            css: "<style>" + page[req.params.page][1] + "</style>",
            js: "<script> function sendedCode() {" + page[req.params.page][2] +"};</script>"
        });
    } catch(e) {
        res.sendStatus(404);
    };
});

//Start server
server.listen(process.env.PORT || 80, () => {
    console.log("Server has run on port 80.");
});