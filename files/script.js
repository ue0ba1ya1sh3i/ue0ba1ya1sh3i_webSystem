//Execute the code sent from node.js
sendedCode();

function viewCookie(key) {
    return ((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
};