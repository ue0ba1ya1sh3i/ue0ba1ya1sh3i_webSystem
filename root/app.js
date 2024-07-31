const express = require("express");
const root = express.Router();
const expressApp = express();
const fs = require("fs");

//loadJson
const appInfo = JSON.parse(fs.readFileSync("deta/app/app.json"), null, 2);

//use express json
expressApp.use(express.json());

root.get("/:id", (req,res) => {
    try {
        var text = fs.readFileSync("./deta/app/num" + req.params.id + ".html", 'utf-8');

        res.render("index", {
            id: "App | num" + req.params.id,
            html: text
        });
    } catch(e) {
        res.render("error", {
            code: "404",
            message: "page not found"
        });
    };
});

root.post("/info", (req,res) => {
    var access = req.body.access;
    if(access === "true") {
        var info = appInfo;
        res.send(info);
    } else {
        res.render("error", {
            code: "404",
            message: "page not found"
        });
    };
});

module.exports = root;