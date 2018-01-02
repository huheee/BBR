
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
         

        console.log('Received Event: ' + id);
    }
};

app.initialize();





function weatherLoad(){
	
	
	var wurl = "http://www.kma.go.kr/wid/queryDFS.jsp?gridx=80&gridy=73";
	$.ajax({
             type: "GET",             
             url: wurl,
             //data: "{}",
             cache: false,
             dataType: "xml",
             success: wonSuccess
           });
	
	
	

}
function wonSuccess(data){ 
  var i = 0;
  var txtname = "";
  var now = new Date();
  var hour = now.getHours();

	// 기상청 xml은 3시간 단위로 예보를 보여줌. 현재시간 기준으로 어떤 예보를 가져올 것인지 정함.
	if (hour == 0 || hour == 1 || hour == 2)
	{
		var hourGubun = 3;
	}
	else if(hour == 3 || hour == 4 || hour == 5)
	{
		var hourGubun = 6;
	}
	else if(hour == 6 || hour == 7 || hour == 8)
	{
		var hourGubun = 9;
	}
	else if(hour == 9 || hour == 10 || hour == 11)
	{
		var hourGubun = 12;
	}
	else if(hour == 12 || hour == 13 || hour == 14)
	{
		var hourGubun = 15;
	}
	else if(hour == 15 || hour == 16 || hour == 17)
	{
		var hourGubun = 18;
	}
	else if(hour == 18 || hour == 19 || hour == 20)
	{
		var hourGubun = 21;
	}
	else if(hour == 21 || hour == 22 || hour == 23)
	{
		var hourGubun = 24;
	}

  
  var i = 0;
  $(data).find("data").each(function () {
	  var st;
	  
		if($(this).find("hour").text() == hourGubun)
		{	 
			st = $(this).find("wfKor").text();
			
			  if (st == "맑음")
			  {
				$("#wimg"+i).attr("src",'img/1.png');
				$("#wimg"+i).attr("alt",'맑음');
			  }
			  if (st == "구름 많음" || st == "흐림")
			  {
				$("#wimg"+i).attr("src",'img/2.png');
				$("#wimg"+i).attr("alt",'구름 많음/흐림');
			  }
			  if (st == "구름 조금")
			  {
				$("#wimg"+i).attr("src",'img/3.png');
				$("#wimg"+i).attr("alt",'구름 조금');
				
			  }
			  if (st == "흐리고 비" || st == "비")
			  {
				$("#wimg"+i).attr("src",'img/4.png');
				$("#wimg"+i).attr("alt",'흐리고 비');
			  }
			  if (st == "눈/비")
			  {
				$("#wimg"+i).attr("src",'img/5.png');
				$("#wimg"+i).attr("alt",'눈');
				
			  }
			  
			  if($(this).find("tmn").text() == -999)
			  {
				  $("#low"+i).html("0.0");
			  }
			  else
			  {
				  $("#low"+i).html( $(this).find("tmn").text());
			  }
			  
			  
			  if($(this).find("tmx").text() == -999)
			  {
				  $("#high"+i).html("0.0");
			  }
			  else
			  {
				  $("#high"+i).html( $(this).find("tmx").text());
			  }
			  i++;
		}  
		

   
  });
}


 



