// Auto login for mytritonlink

(function (chrome) {
    loginField = document.getElementById('ssousername');
    passField = document.getElementById('ssopassword');
    var btm = document.getElementsByTagName('input')[3];
    if (loginField && passField) {
        chrome.runtime.sendMessage({user: ['mytritonlink',(new Date()).valueOf()]}, function (response) {
            if (response) {
                loginField.value = response.username;
                passField.value = response.password;
                btm.click();
            }
        })
    };
}(chrome));
