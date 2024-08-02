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
function writeCookie(key,value,day) {
    if(day === undefined) {
        document.cookie = key + "=" + value;
    } else {
        document.cookie = key + "=" + value + "; max-age=" + day + ";";
    };
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

//colorMode
function colorMode() {
    var cssRoot = document.querySelector(':root');

    if(viewCookie("darkMode") === "true") {
        cssRoot.style.setProperty('--bodyBackground', 'rgb(20, 20, 20)');
        cssRoot.style.setProperty('--fontColor', 'black');
        cssRoot.style.setProperty('--normalColor', 'rgb(190, 190, 190)');
        cssRoot.style.setProperty('--subColor', 'rgb(150, 150, 150)');
    } else {
        cssRoot.style.setProperty('--bodyBackground', 'rgb(194, 194, 194)');
        cssRoot.style.setProperty('--fontColor', 'white');
        cssRoot.style.setProperty('--normalColor', '#363636');
        cssRoot.style.setProperty('--subColor', 'rgb(104, 104, 104)');
    };
};

colorMode();