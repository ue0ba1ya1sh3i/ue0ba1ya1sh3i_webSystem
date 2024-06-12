//expressとルーターのインポート
const express = require("express");
const root = express.Router();

// データをPOSTする関数
async function postData(url = '', data = {}) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    return response.json();
};

root.get("/:title", (req,res) => {
    var url = "https://script.google.com/macros/s/AKfycbzsh8yuG7qq2fDVllj-DniUscS5e1Q6kHvZ5YFMsxRYhyieysEL5tqP3NUbO6kJQs66/exec";

    const data = {
        title: 'news',
        config: req.params.title
    };
      
    postData(url, data)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json({
            deta: "Error: " + error
        });
    });
});

module.exports = root;