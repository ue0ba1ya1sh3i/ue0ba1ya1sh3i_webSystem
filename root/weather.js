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

root.get("/:place", (req,res) => {
    var url = "https://script.google.com/macros/s/AKfycbzsh8yuG7qq2fDVllj-DniUscS5e1Q6kHvZ5YFMsxRYhyieysEL5tqP3NUbO6kJQs66/exec";

    //地名の特定
    var place = {
        Osaka: ["34.69069","135.504983055556"],
        Naha: ["26.213141","127.690802"],
        Shinjuku: ["35.6904811111111","139.706551111111"],
        Sapporo: ["43.059635","141.357983055556"],
        Hukuoka: ["33.58692","130.403998888889"]
    };

    //プロキシを使用してデータを取得する
    var placeCodeProxy = new Proxy(place, {
        get(target, prop) {
            if (prop === 'dynamic') {
                return target[req.params.place];
            }
            return target[prop];
        }
    });

    const data = {
        title: 'weather',
        config: placeCodeProxy.dynamic
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