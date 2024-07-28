//getInfo
fetch("https://ipinfo.io?callback")
.then((response) => response.json())
.then((ipInfo) => {
    var info = [ipInfo.country,ipInfo.city,ipInfo.loc,ipInfo.timezone,ipInfo.ip,location.pathname];

    //sendDeta
    fetch('/info', {
        //settings
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: "frontInfo",
            info: info
        })
    })

    .then(response => response.text())
    .then(data => {
        //changedPass
        if(data === "changed Pass") {
            window.location.href = "/admin/" + adminpass;
        } else {
            window.alert("Error: " + data);
        };
    })

    .catch((error) => {
        //error
        window.alert("Error: " + error);
    });
});

//viewCookie
function viewCookie(key) {
    return ((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
};