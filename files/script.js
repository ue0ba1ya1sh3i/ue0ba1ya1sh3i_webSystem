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

//writeCookie
function writeCookie(key,value) {
    document.cookie = key + "=" + value;
};

//widgetError
function widgetError(link,title,message) {
    if(title === undefined) {
        if(message === undefined) {
            document.getElementById("main").insertAdjacentHTML(
                'beforeend', 
                '<div class="widget"><a href="' + link + '"><p class="widgetTitle">An error has occurred.</p><p class="widgetSubTitle">Please try again in a few seconds.</p></a></div>'
            );
        } else {
            document.getElementById("main").insertAdjacentHTML(
                'beforeend', 
                '<div class="widget"><a href="' + link + '"><p class="widgetTitle">An error has occurred.</p><p class="widgetSubTitle">' + message + '</p></a></div>'
            );
        };
    } else {
        document.getElementById("main").insertAdjacentHTML(
            'beforeend', 
            '<div class="widget"><a href="' + link + '"><p class="widgetTitle">' + title + '</p><p class="widgetSubTitle">' + message + '</p></a></div>'
        );
    };
};