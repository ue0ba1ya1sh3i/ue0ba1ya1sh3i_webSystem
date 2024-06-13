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
        `<div class="left"></div>
        <div class="main">
            <!--ここに要素が入る--> 
        </div>
        <div class="right"></div>`,

        `main {
            position: absolute;
            top: 50%;
            left: 50%;
            display: flex;
            transform: translate(-50%, -50%);
            background-color: #f1f1f1e3;
            padding: 10px;
            width: 80%;
            height: 70%;
            border-radius: 30px;
            z-index: 100;
        }`
    ]
};

//メインページの実装
expressApp.get("/", (req, res) => {
    res.render("index", {
        id: "home",
        html: pages.home[0],
        css: "<style>" + pages.home[1] + "</style>"
    });
});

//テストページ(HTML/CSS/JSの開発用)
expressApp.get("/test", (req, res) => {
    res.render("test");
});

//ページの実装
expressApp.get("/:page", (req, res) => {
    res.render("index", {id: req.params.page});
});

//天気情報システムのルーティング
const weatherRoot = require("./root/weather");
expressApp.use("/program/weather", weatherRoot);

//ニュースシステムのルーティング
const newsRoot = require("./root/news");
expressApp.use("/news", newsRoot);

//サーバーの起動
server.listen(process.env.PORT || 80, () => {
    console.log("Server is running on localhost:80");
});