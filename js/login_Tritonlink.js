// Auto login for mytritonlink

(function (chrome) {
    var loginField = $('#ssousername');
    var passField = $('#ssopassword');
    var btm = $('input')[3];
    if (loginField && passField) {
        chrome.runtime.sendMessage({user: ['mytritonlink',(new Date()).valueOf()]}, function (response) {
            if (response) {
                loginField.val(response.username);
                passField.val(response.password);
                btm.click();
                alert("Loged In");//test
            }
        })
    };
}(chrome));
