// Auto login for tritoned

(function (chrome) {

    loginField = document.getElementById('user_id');
    passField = document.getElementById('password');
    var btm = document.getElementById('entry-login');
    chrome.extension.sendRequest({method: "username"}, function(response) {
      var username = user;
      loginField.value = username;
    });
    chrome.extension.sendRequest({method: "password"}, function(response) {
      var password = password;
      passField.value = password;
      btm.click();
    });
}(chrome));
