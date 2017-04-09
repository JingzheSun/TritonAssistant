////////////////////////////////Local Storage
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // GET request
    if (request.storage)	localStorage[request.storage]= request.value;
});


