const express = require("express");
const expressApp = express();
const root = express.Router();
const fs = require("fs");

//loadJson
const settings = JSON.parse(fs.readFileSync('settings.json'), null, 2);
const blogInfo = JSON.parse(fs.readFileSync('deta/blog/blog.json'), null, 2);
const appInfo = JSON.parse(fs.readFileSync("deta/app/app.json"), null, 2);

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


root.get("/:id", (req,res) => {
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


root.post("/changePass/" + settings.changePassword, (req, res) => {
    const password = req.body;

    //change
    settings.adminPassword = password.adminPass;
    settings.testPassword = password.testPass;
    fs.writeFileSync('./settings.json', JSON.stringify(settings));

    consoleColor("changedPass","green");
    res.send("changed Pass");
});

root.post("/confilmChangePass", (req, res) => {
    var password = req.body.password

    //confilm
    if(settings.changePassword === password) {
        res.send("success.")
        consoleColor("Change password saved","yellow");
    } else {
        res.send("no.")
        consoleColor("Change password is incorrect","red");
    };
});

root.post("/terminal/" + settings.changePassword, (req,res) => {
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

root.post("/addBlog/" + settings.changePassword, (req,res) => {
    //get
    var length = Object.keys(blogInfo).length + 1;

    //mainCode
    eval("blogInfo.num" + length + " = req.body");
    fs.writeFileSync('./deta/blog/blog.json', JSON.stringify(blogInfo));

    fs.writeFile('./deta/blog/num' + length + ".html", "", (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("success");
        };
    });
});

root.post("/addApp/" + settings.changePassword, (req,res) => {
    //get
    var length = Object.keys(appInfo).length + 1;

    //mainCode
    eval("appInfo.num" + length + " = req.body");
    fs.writeFileSync('./deta/app/app.json', JSON.stringify(appInfo));

    fs.writeFile('./deta/app/num' + length + ".html", "", (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("success");
        };
    });
});

module.exports = root;