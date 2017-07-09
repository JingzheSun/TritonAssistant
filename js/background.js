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
    if (request.badges) {
        updatebadge();
        sendResponse({badges: localStorage["badges"]});
    }
});

$("#login").click(function (){
    localStorage.setItem("username", $("#username").val());
    localStorage.setItem("password", $("#password").val());
    alert($("#username").val())
});

//remember the last input
$("#username").val(localStorage["username"]);
$("#password").val(localStorage["password"]);
function updatebadge() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var badgexmlhttp = new XMLHttpRequest();
            badgexmlhttp.onreadystatechange = function () {
                if (badgexmlhttp.readyState == 4 && badgexmlhttp.status == 200) {
                    //alert(badgexmlhttp.responseText);
                    /:(\w+),/gm.exec(badgexmlhttp.responseText);
                    //alert(RegExp.$1);
                    localStorage.setItem("badges", RegExp.$1);
                }
            }
            badgexmlhttp.open("POST", "https://tritoned.ucsd.edu/webapps/portal/dwr_open/call/plaincall/ToolActivityService.getActivityForAllTools.dwr", true);
            badgexmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            badgexmlhttp.send('callCount=1&page=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1&httpSessionId=' + localStorage['tritonedcookie'] +'&scriptSessionId=8A22AEE4C7B3F9CA3A094735175A6B14249&c0-scriptName=ToolActivityService&c0-methodName=getActivityForAllTools&c0-id=0&batchId=1');
        }
    }
    xmlhttp.open("POST", "https://tritoned.ucsd.edu/webapps/login/", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("action=login&login=Login&new_loc=&password=" + localStorage['password'] +"&user_id="+localStorage['username']);
}