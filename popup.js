// Update HTML inside schedule section
$("#detailSchedule").slideUp();
$("#classSchedule").prepend("<tr><th>M</th><th>Tu</th><th>W</th><th>Th</th><th>F</th></tr>");

(function (){	
	var scheduletext = localStorage["schedule"];
	var tdPatt=/<td>(.|\n)*?<\/td>/gm;
	var classBlocks = scheduletext.match(tdPatt);
	
	var timePatt = /[0-9]{1,2}:.*(0am|0pm)/gm;
	var dict = {0: 'M', 1: 'Tu', 2: 'W', 3: 'Th', 4: 'F'};
	var classInfo ={}
	 
	for(i=0; i< classBlocks.length/5; i++){
		var newRow = "<tr>";
		for(j=0; j< 5; j++){
			var classPatt = /[A-Z]{3,6} [0-9]{1,4}\w*/gm;
			className =classPatt.exec(classBlocks[i*5+j]);
			className = className||"";
			className = /Discussion/.test(classBlocks[i*5+j])? (className + "-D") : className;
			newRow = newRow + "<td>" + className + "</td>";
			
			if (!className)
				continue
			var classDay = dict[j];	
			var classTime = classBlocks[i*5+j].match(timePatt);
			var classRoom = classPatt.exec(classBlocks[i*5+j]);
			if (!classInfo[className]){
				classInfo[className] = [classDay,classTime,classRoom];
			}
			else if (classInfo[className][0].search(classDay)<0){
				classInfo[className][0] += classDay;
			}
		}
		newRow += "</tr>"
		$("#classSchedule tr:last").after(newRow);
	}
	for(key in classInfo){
		var detail = key+"\t"+classInfo[key][0]+"\t"+classInfo[key][1]+"\t"+classInfo[key][2];
		$("#classDetail").append(detail+"<br>");
	}
    findNextClass(classInfo);

    chrome.runtime.sendMessage({badges: "require"}, function(response) {
	if (response.badges)
		$("#badges").html(response.badges);
	else
		$("#badges").html('click to update cookie');
    });
})();

function findNextClass(classInfo){
	var date = new Date();	
	var day = date.getDay()-1;
	var hrs = date.getHours();
	var mins = date.getMinutes();
	var first;
	
	for(i=0; i< 5; i++){
		len = $("#classSchedule tr").length;
		for(j=1; j< len; j++){
			course = $("#classSchedule tr")[j].getElementsByTagName("td")[i].innerHTML;
			if(course.length<4)
				continue
			if(!first)
			//	alert(course)
				first = course;
			t = String(classInfo[course][1]);
			courseHr = Number(/[0-9]+/.exec(t));
			pm = t.search("pm") == t.search("-") - 3 ? 12 : 0;
			courseHr += pm;
			courseMin = t.substr(t.search(":")+1,2);
			if(i<day ||(i==day && courseHr <hrs ||(courseHr == hrs && courseMin < mins))){
				continue;
			}
			else{
				$("#courseName").html(course);
				$("#courseTime").html(classInfo[course][0]+"\t"+classInfo[course][1]);
				$("#courseLocation").html(classInfo[course][2]);
				return;
			}
		}
	}
	$("#courseName").html(first);
	$("#courseTime").html(classInfo[first][0]+"\t"+classInfo[first][1]);
	$("#courseLocation").html(classInfo[first][2]);
}



var expand = 0;
$(document).ready(function(){
  $(".btn1").click(function(){
	if (expand){
		$("#detailSchedule").slideUp();
		$(".btn1").html("By fire be purged!");
		expand++;
	}
	else{
		$("#detailSchedule").slideDown();
		$(".btn1").html("Behold Ragnaros the Firelord!");
		expand--;
	}
  });
});

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  //  	alert(/La Jolla/gm.exec(xmlhttp.responseText));
    }
}
xmlhttp.open("GET", "https://weather.com/weather/today/l/32.88,-117.24", true);
xmlhttp.send();