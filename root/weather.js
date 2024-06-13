//expressとルーターのインポート
const express = require("express");
const root = express.Router();
const axios = require("axios");
const cheerio = require('cheerio');

root.get("/:id", (req,res) => {
    //URLの作成
    const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/" + req.params.id + ".json";

    axios.get(url)
    .then(response => {
        var deta = response.data[0].timeSeries[0].areas[0]
        res.json({deta});
    })
    .catch(error => {
        res.json({
            deta: "Error: " + error
        });
    });
});

module.exports = root;