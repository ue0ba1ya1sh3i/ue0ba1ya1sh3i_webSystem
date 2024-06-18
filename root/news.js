//expressとルーターのインポート
const express = require("express");
const root = express.Router();
const axios = require("axios");

root.get("/", (req,res) => {
    res.send("a")
});

module.exports = root;