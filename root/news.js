//expressとルーターのインポート
const express = require("express");
const root = express.Router();
const axios = require("axios");

root.get("/:id", (req,res) => {
    
});

module.exports = root;