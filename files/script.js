//viewCookie
function viewCookie(key) {
    return ((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
};