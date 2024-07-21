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

//mainPage
expressApp.get("/", (req, res) => {
    var html = fs.readFileSync("./pages/home.html", 'utf-8');

    res.render("index", {
        id: "home",
        html: html
    });
});

//testPage
expressApp.get("/test/:id", (req, res) => {
    if(req.params.id === settings.testPassword) {
        res.render("./secret/test");
    } else {
        res.render("./error/404");
        console.error("Warning: Test page password is incorrect");
    };
});

//Admin Settings Page
expressApp.get("/admin/:id", (req, res) => {
    if(req.params.id === settings.adminPassword) {
        res.render("./secret/admin", {
            adminPass: settings.adminPassword,
            testPass: settings.testPassword
        });
        console.error("Warning: Entered the admin page");
    } else {
        res.render("./error/404");
        console.error("Warning: Admin page password is incorrect");
    };
});

//otherPages
expressApp.get("/:page", (req, res) => {
    try {
        var text = fs.readFileSync("./pages/" + req.params.page + ".html", 'utf-8');

        res.render("index", {
            id: req.params.page,
            html: text
        });
    } catch(e) {
        res.render("./error/404");
    };
});

//Start server
server.listen(process.env.PORT || 80, () => {
    console.log("Server has run on port 80.");
});