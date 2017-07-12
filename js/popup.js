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
    updateBudges();

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


$(".tablink").on("click", function(){
	$('#weather').css('display', 'none');
	$(".tablink").css("background", "lightgray");
	$(this).css("background", "white")
	$(".menu").slideUp();
    $('#'+this.name).slideDown();
    if(this.id == 'defaultOpen'){
    	$('#weather').css('display', 'block');
    }
});
$("#defaultOpen").click();

function zfill(num){
    if (num.length == 2){
        return num;
    }else{
        return '0' + num;
    };
}

(function getWeather() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        	var weather = JSON.parse(xmlhttp.response)[0];
        	$('#headerImg').attr('src', 'https://developer.accuweather.com/sites/default/files/' + weather['WeatherIcon'] + '-s.png');
            //alert(weather['WeatherText'] + ':' + weather['Temperature']['Metric']['Value'] + ',' +weather['WeatherIcon']);
            (weather['Temperature']);
            $('#weatherInfo').fadeOut(500, function(){
            	$('#weatherInfo').html(weather['WeatherText'] + '<br>' + weather['Temperature']['Imperial']['Value'] + '&#176;F');	
            });
            $('#weatherInfo').fadeIn(500);
        }
    }
    xmlhttp.open("GET", "http://dataservice.accuweather.com/currentconditions/v1/2168186?apikey=FYirlAWPh3rwyyibVEpeA2deYQtNQ1Gk", true);
    xmlhttp.send();
})();

function updateBudges(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var badgexmlhttp = new XMLHttpRequest();
            badgexmlhttp.onreadystatechange = function () {
                if (badgexmlhttp.readyState == 4 && badgexmlhttp.status == 200) {
                    /:(\w+),/gm.exec(badgexmlhttp.responseText);
                    var budges = RegExp.$1;
                    //localStorage.setItem("badges", RegExp.$1);
					//alert(budges);
					if (budges)
						$("#badges").html(budges);
					else
						$("#badges").html('update cookie');
                }
            }
            badgexmlhttp.open("POST", "https://tritoned.ucsd.edu/webapps/portal/dwr_open/call/plaincall/ToolActivityService.getActivityForAllTools.dwr", true);
            badgexmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            badgexmlhttp.send('callCount=1&page=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1&httpSessionId=' + localStorage['tritonedcookie'] +'&scriptSessionId=8A22AEE4C7B3F9CA3A094735175A6B14249&c0-scriptName=ToolActivityService&c0-methodName=getActivityForAllTools&c0-id=0&batchId=1');
        }
    }
    xmlhttp.open("POST", "https://tritoned.ucsd.edu/webapps/login/", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("action=login&login=Login&new_loc=&password=" + localStorage['password'] +"&user_id="+localStorage['username']);
}