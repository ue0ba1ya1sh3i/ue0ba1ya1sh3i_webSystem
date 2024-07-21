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

//Load json
const settings = JSON.parse(fs.readFileSync('settings.json'), null, 2);

//mainPage
visitNum = 0;
expressApp.get("/", (req, res) => {
    var html = fs.readFileSync("./pages/home.html", 'utf-8');

    //visitNum
    visitNum = visitNum + 1;
    consoleColor(visitNum + "th visit","green");

    res.render("index", {
        id: "home",
        html: html,
        js: "<script>function sendedCode() {document.getElementById('welcomeTitle').textContent = 'ようこそ(総訪問数: " + visitNum + "回目)';};</script>"
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

//Admin Settings Page
expressApp.get("/admin/:id", (req, res) => {
    if(req.params.id === settings.adminPassword) {
        res.render("./secret/admin", {
            adminPass: settings.adminPassword,
            testPass: settings.testPassword
        });
        consoleColor("Warning: Entered the admin page","yellow");
    } else {
        res.render("error", {
            code: "404",
            message: "page not found"
        });
        consoleColor("Warning: Admin page password is incorrect","red");
    };
});

//otherPages
expressApp.get("/:page", (req, res) => {
    try {
        var text = fs.readFileSync("./pages/" + req.params.page + ".html", 'utf-8');
        var js = frontJS[req.params.page];
        console.log(js);

        res.render("index", {
            id: req.params.page,
            html: text,
            js: "<script>function sendedCode() {" + js + "};</script>"
        });
    } catch(e) {
        console.log(e);
        res.render("error", {
            code: "404",
            message: "page not found"
        });
    };
});

//frontJS
var frontJS = {
    blog: "",
    myApp: "",
    settings: ""
};

//blog
expressApp.get("/blog/:id", (req, res) => {
    res.render("error", {
        code: "404",
        message: "page not found"
    });
});

//changePassword
expressApp.use(express.json());
expressApp.post('/changePass/' + settings.changePassword, (req, res) => {
    const password = req.body;

    //change
    settings.adminPassword = password.adminPass;
    settings.testPassword = password.testPass;
    fs.writeFileSync( './settings.json', JSON.stringify(settings));

    consoleColor("changedPass","green");
    res.send("changed Pass");
});

//terminal
expressApp.use("/terminal/" + settings.changePassword, (req,res) => {
    var code = req.body;

    try {
        eval(code.code);
        res.send("success");
    } catch(e) {
        consoleColor(e,"red");
        
        //For some reason, if you don't include a space, it becomes {}
        res.send("" + e);
    };
});

//Start server
server.listen(process.env.PORT || 80, () => {
    consoleColor("Server has run on port 80.","green");
});