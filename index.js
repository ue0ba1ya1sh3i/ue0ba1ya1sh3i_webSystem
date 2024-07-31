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
expressApp.use('/deta', express.static('deta'));

//Load json
const settings = JSON.parse(fs.readFileSync('settings.json'), null, 2);

//use express json
expressApp.use(express.json());

//consoleColor
function consoleColor(text,color) {
    if(color === "red") {
        console.log("\u001b[31m" + text);
    } else if(color === "green") {
        console.log("\u001b[32m" + text);
    } else if(color === "yellow") {
        console.log("\u001b[33m" + text);
    };

    //reset
    console.log("\u001b[0m");
};

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
        res.render("error", {
            code: "404",
            message: "page not found"
        });
        consoleColor("Warning: Test page password is incorrect","red");
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
        res.render("error", {
            code: "404",
            message: "page not found"
        });
    };
});

//Importing a blogPage
const blogRoot = require("./root/blog");
expressApp.use("/blog", blogRoot);

//Importing a appPage
const appRoot = require("./root/app");
expressApp.use("/app", appRoot);

//Importing a adminPage
const adminRoot = require("./root/admin");
expressApp.use("/admin", adminRoot);

//userInfo
expressApp.post("/info", (req, res) => {
    var deta = req.body;
    console.log(deta);

    res.send("success");
});

//Start server
server.listen(process.env.PORT || 80, () => {
    consoleColor("Server has run on port 80.","green");
});