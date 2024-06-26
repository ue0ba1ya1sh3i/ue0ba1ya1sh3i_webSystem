//expressとルーターのインポート
const express = require("express");
const root = express.Router();
const axios = require("axios");

root.get("/", (req,res) => {
    res.send("test message");
});

module.exports = root;