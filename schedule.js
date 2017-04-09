// Script run on MyTritonLink home page

(function (chrome) {
    // Grab schedule from page
    var new_schedule = document.getElementById("class_schedule").innerHTML; //innerHTML?
	chrome.runtime.sendMessage({storage:'schedule',value:new_schedule});
}(chrome));
