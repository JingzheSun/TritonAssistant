////////////////////////////////Local Storage
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // GET request
    if (request.storage)	localStorage[request.storage]= request.value;
    if (request.user){
        sendResponse({username: localStorage["username"],
                      password: localStorage["password"]});
    }
/*    if (request.badges){
        var hosturl = 'https://tritoned.ucsd.edu/webapps/login/';
        var postData = {'user_id':localStorage["username"],'password':localStorage["password"]};
        $.post(hosturl, postData, function(data) {
        });
	sendResponse({badges: localStorage["badges"]});
    };*/
});

document.querySelector("#Login").addEventListener('click', function (){
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("password", document.getElementById("password").value);
});
document.getElementById("username").value=localStorage["username"];
document.getElementById("password").value=localStorage["password"];

