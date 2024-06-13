//時計のセットアップ
function updateClock() {
    // 現在の日時を取得
    const now = new Date();

    // 時、分、秒を取得
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 時、分、秒が1桁の場合は0を追加
    const displayHours = hours.toString().padStart(2, "0");
    const displayMinutes = minutes.toString().padStart(2, "0");
    const displaySeconds = seconds.toString().padStart(2, "0");

    // 時計の要素を取得
    const clockElement = document.getElementById("clock");

    // 時計の要素に時刻を表示
    clockElement.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    // 1秒後に再度更新
    setTimeout(updateClock, 1000);
};
updateClock();

//カレンダーのセットアップ
var calendar = new Date();
var day = calendar.getDay();
var date = calendar.getDate();
var month = calendar.getMonth();
var daydeta = ["日","月","火","水","木","金","土"]
document.getElementById("calendar").textContent = month + "月" + date + "日" + daydeta[day] + "曜日";

//cookieを読むコード
function viewCookie(key) {
    var value = document.cookie.match(
        new RegExp(key+'\=([^\;]*)\;*')
    )[1];

    return value;
};

//cookieを書くコード
function writeCookie(name, value) {
    var expires = "Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = name + "=" + value + ";expires=" + expires + "; path=/";
};

//ダイアログボックスの機能
let dialogContent = document.getElementById("dialog-content");
let dialogTitle = document.getElementById("dialog-title");
let dialogMessage = document.getElementById("dialog-message");

const dialog = {
    prompt: function(message,type,canClose,title) {
        //ダイアログボックスの表示
        document.getElementById("dialog").style.display = "block";
        document.getElementById("dialog").classList.add('dialogAnimation');

        //メッセージの作成
        dialogTitle.textContent = title;
        dialogMessage.textContent = message;

        //✕で閉じることができるか
        if(canClose === false) {
            document.getElementById("closeButton").style.display = "none";
        };

        //HTMLの挿入
        dialogContent.insertAdjacentHTML(
            "afterbegin",`<input id="dialog-text" type="text">
            <input onclick="dialogButton('normal','` + type + `')" id="dialog-button" type="button" value="決定">`
        );
    },

    alert: function(message,title) {
        //ダイアログボックスの表示
        document.getElementById("dialog").style.display = "block";
        document.getElementById("dialog").classList.add('dialogAnimation');

        //メッセージの作成
        dialogTitle.textContent = title;
        dialogMessage.textContent = message;

        //HTMLの挿入
        dialogContent.insertAdjacentHTML(
            'afterbegin',`<input onclick="resetDialog()" id="dialog-button" type="button" value="OK">`
        );
    }
};

//ボタンが押されたとき(メインダイアログプログラム)
function dialogButton(type,message) {
    var dialogTextBox = document.getElementById("dialog-text").value;
    if(type === "normal") {
        if(message === "name") {
            writeCookie("name",dialogTextBox);
            resetDialog();
            dialog.prompt(viewCookie("name") + "さんですね、ようこそ、最後に天気を取得するためにあなたの地域を教えてくれませんか？","weather",false,"天気情報の設定");
        } else if(message === "weather") {
            writeCookie("weather",dialogTextBox);
            resetDialog();
            dialog.alert("質問の回答ありがとうございます!皆様に機能の便利さを知ってもらうために努力をしているので何卒宜しくお願い致します！","設定の完了");
            writeCookie("visited",true);
            startCode();
        };
    };
};

//ダイアログボックスのリセット
function resetDialog() {
    //ボタンスタイルの設定
    document.getElementById("closeButton").style.display = "flex";
    
    //タイトルのリセット
    dialogTitle.textContent = "ここにタイトルが入る";
    dialogMessage.textContent = "ここにメッセージが入る";

    //子要素を削除
    let dialogContent = document.getElementById('dialog-content');
    
    while (dialogContent.firstChild) {
        dialogContent.removeChild(dialogContent.firstChild);
    };

    //クラスの削除
    document.getElementById("dialog").classList.remove('dialogAnimation');

    //ダイアログを隠す
    document.getElementById("dialog").style.display = "none";
};

//初めて来たか確認するプログラム
try {
    viewCookie("visited");
    startCode();
} catch(e) {
    dialog.prompt("こんにちは!突然ですがこのサイトを使用するにはあなたに関しての情報がいくつかいります！最初に名前を教えてください。","name",false,"ようこそ");
};

//ハンバーガーメニューのボタンが押されたとき
var hamburgerButton = document.getElementById("header-check");

function hamburger(checked) {
    if(checked === false) {
        //ここはチェックが外されたときのプログラム
        document.getElementById("header-link").style.display = "none";
        document.getElementById("header-title").style.margin = "0";
    } else {
        //ここはチェックをつけた時のプログラム
        document.getElementById("header-link").style.display = "flex";
        document.getElementById("header-title").style.margin = "0 0 10px 0";
    };
};

//スタートコード
function startCode() {
    //天気情報の取得
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/program/weather/" + viewCookie("weather"), true);
    xhr.onload = (e) => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            //ここでやっと天気情報を変数に格納できる
            var weatherDeta = JSON.parse(xhr.responseText).deta;
            console.log(weatherDeta);
        } else {
            //エラー処理
            console.error(xhr.statusText);
        }
    }
    };
    xhr.onerror = (e) => {
        //エラー処理
        console.error(xhr.statusText);
    };

    xhr.send();
};

//初期化
if(window.innerWidth < 601) {
    hamburger(false);
    document.getElementById("header-link").style.flexFlow = "column";
} else {
    document.getElementById("header-link").style.flexFlow = undefined;
    document.getElementById("header-link").style.display = "block";
};

window.addEventListener('resize', function() {
    if(window.innerWidth < 601) {
        hamburger(false);
        document.getElementById("header-link").style.flexFlow = "column";
    } else {
        document.getElementById("header-link").style.flexFlow = undefined;
        document.getElementById("header-link").style.display = "block";
    };
});

//node.jsから送られてきたJSを最後に実行する
run();