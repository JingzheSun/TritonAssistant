// Auto login for mytritonlink

(function (chrome) {
    loginField = document.getElementById('ssousername');
    passField = document.getElementById('ssopassword');
    var btm = document.getElementsByTagName('input')[3];
    chrome.runtime.sendMessage({user:"require"}, function(response) {
    if (response){
        loginField.value = response.username;
        passField.value = response.password;
        btm.click();
        };
    });
}(chrome));
