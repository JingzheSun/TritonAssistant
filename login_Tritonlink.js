// Auto login for mytritonlink

(function (chrome) {
    var test = 0;
    loginField = document.getElementById('ssousername');
    passField = document.getElementById('ssopassword');
    var btm = document.getElementsByTagName('input')[3];
    chrome.extension.sendRequest({method: "username"}, function(response) {
      var username = username;
      loginField.value = username;
    });
    chrome.extension.sendRequest({method: "password"}, function(response) {
      var password = password;
      passField.value = password;
      if (test != 0){
          btm.click();
      };
    });
}(chrome));
