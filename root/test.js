//expressとルーターのインポート
const express = require("express");
const root = express.Router();

root.get("/:message", (req,res) => {
    res.json({
        deta: req.params.message
    });
});

module.exports = root;