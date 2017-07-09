// Auto login for tritoned

(function (chrome) {
    var tritonedcookie = document.cookie;
    /JSESSIONID=(\w*);/gm.exec(tritonedcookie)
    var cookieget = RegExp.$1;
    //alert(cookieget);
    chrome.runtime.sendMessage({'storage' : 'tritonedcookie','value' : cookieget});

    loginField = document.getElementById('user_id');
    passField = document.getElementById('password');
    var btm = document.getElementById('entry-login');
    if (loginField && passField) {
        chrome.runtime.sendMessage({user: ['tritoned',(new Date()).valueOf()]}, function (response) {
            if (response) {
                loginField.value = response.username;
                passField.value = response.password;
                btm.click();
            }
            ;
        });
    };
}(chrome));
