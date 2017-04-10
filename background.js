////////////////////////////////Local Storage
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // GET request
    if (request.storage)	localStorage[request.storage]= request.value;
    if (request.user){
	sendResponse({username: localStorage["username"],
                      password: localStorage["password"]});
    }
});

document.querySelector("#Login").addEventListener('click', function (){
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("password", document.getElementById("password").value);
    alert("success");
});
document.getElementById("username").value=localStorage["username"];
document.getElementById("password").value=localStorage["password"];
