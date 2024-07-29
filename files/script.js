//getInfo
fetch("https://ipinfo.io?callback")
.then((response) => response.json())
.then((ipInfo) => {
    info = [ipInfo.country,ipInfo.city,ipInfo.loc,ipInfo.timezone,ipInfo.ip,location.pathname];

    fetch('/info', {
        //settings
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            info
        })
    });
});

//viewCookie
function viewCookie(key) {
    return ((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
};