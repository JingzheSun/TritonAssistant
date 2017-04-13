////////////////////////////////Local Storage
var senttime = {'tritoned': 0, 'mytritonlink' : 0}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // GET request
    if (request.storage)	localStorage[request.storage]= request.value;
    if (request.user) {
        if (request.user[1] - senttime[request.user[0]] < 10000){}
        else {sendResponse({
            username: localStorage["username"],
            password: localStorage["password"]
        })};
        senttime[request.user[0]] = request.user[1];
    }
});

document.querySelector("#Login").addEventListener('click', function (){
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("password", document.getElementById("password").value);
});
document.getElementById("username").value=localStorage["username"];
document.getElementById("password").value=localStorage["password"];

