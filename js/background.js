////////////////////////////////Local Storage
var senttime = {'tritoned': 0, 'mytritonlink' : 0}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // GET request
    if (request.storage)	
        localStorage[request.storage]= request.value;
    if (request.user) {
        if (request.user[1] - senttime[request.user[0]] < 10000){}
        else {sendResponse({
            username: localStorage["username"],
            password: localStorage["password"]
        })};
        senttime[request.user[0]] = request.user[1];
    };
});

$("#login").click(function (){
    localStorage.setItem("username", $("#username").val());
    localStorage.setItem("password", $("#password").val());
    alert($("#username").val()+" restart Browser")
});

//remember the last input
$("#username").val(localStorage["username"]);
$("#password").val(localStorage["password"]);
