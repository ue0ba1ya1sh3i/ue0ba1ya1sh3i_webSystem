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

//メインページの実装
expressApp.get("/", (req, res) => {
    res.render("index", {id: "home"});
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