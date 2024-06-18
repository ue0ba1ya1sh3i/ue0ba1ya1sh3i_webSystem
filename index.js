//expressのインポート
const express = require("express");
const expressApp = express();

//httpのインポート
const http = require("http");
const server = http.createServer(expressApp);

//socket.ioのインポート
const { Server } = require("socket.io");
const io = new Server(server);

//ejsの設定
expressApp.set("view engine", "ejs");

//静的ファイルの実装
expressApp.use('/files', express.static('files'));

//ページのデータ集
const pages = {
    home: [
        `<div class="widget">

        </div>

        <div class="widget">
                
        </div>

        <div class="widget">
                
        </div>

        <div class="widget">
                
        </div>

        <div class="widget">
                
        </div>

        <div class="widget">
                
        </div>
            
        <div class="widget">
                
        </div>

        <div class="widget">
                
        </div>`,

        `div.widget {
            width: 290px;
            height: 250px;
            margin: 10px;
            border-radius: 10px;
            background-color: #ffffff00;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
        }`,

        `console.log("hello world!!!");`
    ],

    myApp: [
        `<h1>my Apps</h1>`,

        `h1 {color: blue;}`,

        `dialog.alert("このページは開発中です...","警告","1");`
    ]
};

//メインページの実装
expressApp.get("/page", (req, res) => {
    res.render("index", {
        id: "home",
        html: pages.home[0],
        css: "<style>" + pages.home[1] + "</style>",
        js: "<script> function run() {" + pages.home[2] + "};</script>"
    });
});

//テストページ(HTML/CSS/JSの開発用)
expressApp.get("/page/test", (req, res) => {
    res.render("test");
});

//ページの実装
expressApp.get("/page/:page", (req, res) => {
    res.render("index", {
        id: req.params.page,
        html: pages[req.params.page][0],
        css: "<style>" + pages[req.params.page][1] + "</style>",
        js: "<script> function run() {" + pages[req.params.page][2] +"};</script>"
    });
});

//天気情報システムのルーティング
const weatherRoot = require("./root/weather");
expressApp.use("/program/weather", weatherRoot);

//ニュースシステムのルーティング
const newsRoot = require("./root/news");
expressApp.use("/program/news", newsRoot);

//サーバーの起動
server.listen(process.env.PORT || 80, () => {
    console.log("Server is running on localhost:80");
});