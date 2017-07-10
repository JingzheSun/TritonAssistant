//function declaration
function addClass() {
	var cName = $("#description").val();
	var prot = $("#protocol").val();
	var cLink = $("#courseWeb").val();

	$("#description").val('');
	$("#courseWeb").val('');

	if (!cName || !cLink){
		alert("Please don't submit blank");
		return;
	}
	if (cLink.endsWith('/')){
		cLink = prot + cLink; 
	}else{
		cLink = prot + cLink + '/'; 
	}
	if (!(cName in links)){
		links[cName] = {};
	}
	if (cLink in links[cName]){
		alert("already added")
		return;
	}

	links[cName][cLink] = '';
	myJSON = JSON.stringify(links);
	localStorage.setItem("courseList", myJSON);

	loadClass(cName,cLink);
}

function loadClass(cName,cLink) {
	var link = '<a target="_blank" href="' + cLink+ '">' + cName + '</a>';
	var list = '<li>' + link + '<span><i class="fa fa-trash"></i></span></li>';
	$("#courseLinks").append(list);
}

function loadClasses() {
	for(var cName in links){
		for(var cLink in links[cName]){
			loadClass(cName,cLink);
		}
	}
}

// scripts
$('#addClass').click(addClass);			//listener on add button
$('#courseWeb').keypress(function(event){	// listener on Enter after typing url
	if(event.which == 13){
		addClass();
	}
});
$('ul').on("click", "span", function(event){	//listener on remove button
	cName = $(this).prev().text();
	cLink = $(this).prev()[0].href;
	console.log(cName+' '+cLink);
	delete links[cName][cLink];
	if(Object.keys(links[cName]).length == 0){
		delete links[cName];
	}
	myJSON = JSON.stringify(links);
	localStorage.setItem("courseList", myJSON);

	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

if (!localStorage.getItem("courseList")) {
	var links = {'Piazza':{'https://www.piazza.com/':''}};
	myJSON = JSON.stringify(links);
	localStorage.setItem("courseList", myJSON);
} else {
	var text = localStorage.getItem("courseList");
	var links = JSON.parse(text);
}

loadClasses();