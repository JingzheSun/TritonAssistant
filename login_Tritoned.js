// Auto login for tritoned

(function (chrome) {
    loginField = document.getElementById('user_id');
    passField = document.getElementById('password');
    var btm = document.getElementById('entry-login');
    chrome.runtime.sendMessage({user:"require"}, function(response) {
    if (response){
        loginField.value = response.username;
        passField.value = response.password;
        btm.click();
        };
    });
}(chrome));
