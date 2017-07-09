if (!localStorage.getItem("courseList")) {
	list = [];
} else {
	var text = localStorage.getItem("courseList");
	list = JSON.parse(text);
}

function addClass() {
	var x1 = $("#description").val();
	var x2 = $("#courseWeb").val();

	list.push(x1);
	myJSON = JSON.stringify(list);
	localStorage.setItem("courseList", myJSON);
	localStorage.setItem(x1,x2);

	loadOneClass(list.length-1);
}
$('#addClass').click(addClass);

function removeClass(i) {
	var x1 = list[i];
	var x2 = localStorage.getItem(x1);
	list.splice(i, 1);
	myJSON = JSON.stringify(list);
	localStorage.setItem("courseList", myJSON);
	localStorage.removeItem(x1);

	var element = document.getElementById("courseLinks");
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	loadClasses();
}

function loadOneClass(i) {
	// ADD CLASS URI
	var x1 = list[i];
	var x2 = localStorage.getItem(x1);

	var para = document.createElement("a");
	var node = document.createTextNode(x1);
	para.appendChild(node);
	para.title = x1;
	para.href = x2;
	para.target="_blank";

	var a = document.createElement("p");
	a.appendChild(para);

	var element = document.getElementById("courseLinks");
	element.appendChild(a);

	// ADD DELETE BUTTON
	var btn = document.createElement("BUTTON");
	var t = document.createTextNode("DELETE " + x1);
	btn.appendChild(t);
	a.appendChild(btn);

	btn.addEventListener ("click", function() {
		removeClass(i);
		element.removeChild(a);
	});
}
function loadClasses() {
	for(var i = 0; i < list.length; i++) {
		loadOneClass(i)
	}
}
loadClasses();

/////////////////////////////////