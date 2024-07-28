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

//use express json
expressApp.use(express.json());

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
const blogInfo = JSON.parse(fs.readFileSync("deta/blog/blog.json"), null, 2);

//mainPage
visitNum = 0;
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

//blog
expressApp.get("/blog/:id", (req, res) => {
    try {
        var text = fs.readFileSync("./deta/blog/num" + req.params.id + ".html", 'utf-8');

        res.render("index", {
            id: "Blog | num" + req.params.id,
            html: text
        });
    } catch(e) {
        console.error(e);
        res.render("error", {
            code: "404",
            message: "page not found"
        });
    }
});

//blogInfo
expressApp.post("/blogInfo", (req, res) => {
    var access = req.body.access;
    if(access === "true") {
        var info = blogInfo;
        res.send(info);
    };
});

//userInfo
expressApp.post("/info", (req, res) => {
    var deta = req.body;
    console.log(deta);
});

//changePassword
expressApp.post('/changePass/' + settings.changePassword, (req, res) => {
    const password = req.body;

    //change
    settings.adminPassword = password.adminPass;
    settings.testPassword = password.testPass;
    fs.writeFileSync( './settings.json', JSON.stringify(settings));

    consoleColor("changedPass","green");
    res.send("changed Pass");
});

//confirmation
expressApp.post("/confilmChangePass", (req, res) => {
    var password = req.body.password

    //confilm
    if(settings.changePassword === password) {
        res.send("success.")
        consoleColor("Change password saved","yellow");
    } else {
        res.send("no.")
        consoleColor("Change password is incorrect","red");
    }
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