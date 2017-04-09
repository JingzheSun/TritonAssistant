// Script run on MyTritonLink home page

(function (chrome) {
    // Grab schedule from page
    var new_schedule = document.getElementById("class_schedule").innerHTML; //innerHTML?
	chrome.runtime.sendMessage({storage:'schedule',value:new_schedule});
}(chrome));


/*
$(document).ready(function(chrome){
	
	var classBlocks = $("#class_schedule td");
	chrome.runtime.sendMessage({storage:'len',value:lassBlocks.length});
	for(i = 0 ; i < classBlocks.length; i++){
		chrome.runtime.sendMessage({storage:'class'+i,value:classBlocks[i]});
	}
});*/