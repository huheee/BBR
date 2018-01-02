var getname = location.href.split("?");

	var d_name = decodeURI(getname[1]);

	var fav = [];
	var mylat, mylan;
	var setlat,setlan;
	var db;
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

function openDB() {
		db = window.openDatabase("BBRDB", "1.0", "BBR DB", 1000);
		db.transaction(
			    function (tx) {
			        tx.executeSql("SELECT name FROM sqlite_master WHERE type='table'", [], function (tx, result) {
			            if (result.rows.length == 1) {
			            	createTable();
			            }     
			        });
			    }
		);
		
		funlist();
}

function createTable() {
		
		db.transaction(function(tx) {
		var sql = "create table if not exists mytable (num INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT)" ;
		tx.executeSql(sql, [] );
		
		});
		
}

function errorDB(sqlError) {
		var msg = "sqlError[" + sqlError.code + "]" + sqlError.message;
}

function favadd() {
    var sql = "insert into mytable(id) values(?)" ;
    db.transaction(function(tx) {
        tx.executeSql(sql,[d_name]);             
    });
    
    alert("즐겨찾기에 추가되었습니다.");
	window.location.reload();

}


function favdel() {
    var sql = "delete from mytable where id = ? " ;
    db.transaction(function(tx) {
        tx.executeSql(sql,[d_name]);             
    });
  
    alert("즐겨찾기가 삭제되었습니다.");
	window.location.reload();
   
}
function funlist() {
	 var sql = "select * from mytable" ;
    db.transaction(function(tx) {
       
        tx.executeSql(sql, [], list, errorDB) ;
    });
}


function list(tx, rs) { 
    var msg="";
    for(var i=0; i < rs.rows.length; i++) {
        fav[i] = rs.rows.item(i)["id"];
    }
	
	xmlload_detail();
}






function findfav(){
	var i;

	for(i = 0; i <fav.length; i++)
	{
		if(d_name == fav[i])
		{
				
				return true;
		}
	}
	return false;
}


	
$(document).ready(function(){
			openDB();

			getLocation();
			
			

	});
	
function xmlload_detail(){
	
			var lat, lan;
		   
		    var url = "http://opendata.busan.go.kr/openapi/service/RentBike/getRentBikeInfoDetail?serviceKey=%2BX2qYlEt6l0Om6Ixc0wJi0Rnj5t7lX9p%2Bts0LxL5LSoedbZX15iTVBptBcjBbWKDExM6zqJ0r4M1HL9KAkfNwA%3D%3D&numOfRows=999&pageSize=999&pageNo=1&startPage=1";
		      
	  
		       $.ajax({
		            type: "GET",             
		            url: url,
		            //data: "{}",
		            cache: false,
		            dataType: "xml",
		            success: onSuccess2
		          });
}
	
	
		  
function onSuccess2(data){ 
	$("#detail_div").text("");
	var favflag = findfav();

	$(data).find("item").each(function () {
			 
		if(d_name == $(this).find("rentSite").text())
		{
			lat = $(this).find("lati").text();
			lan = $(this).find("longi").text();
		
				  
			setTimeout( mapView(lat,lan),200);
			
			var teltext = $(this).find("rentTel").text();
			teltext = teltext.split("-");
			var telnum = teltext[0] + teltext[1] + teltext[2];
			
			var str = "<li><a href='tel:"+telnum+"'>전화번호 : " + $(this).find("rentTel").text()+"</p></a></li>";
			str += "<li>대여소 이름 : " + $(this).find("rentSite").text()+"<p></li>";
			str += "<li>주소 : " + $(this).find("rentAddr").text()+"<p></li>";
			str += "<li>사용 가능 시간 : " + $(this).find("openTime").text()+"<p></li>";
			str += "<li>자전거 대수 : " + $(this).find("adultCnt").text()+"<p></li>";
			str += "<li>자전거 대수(아동 용) : " + $(this).find("kidCnt").text()+"<p></li>";
			str += "<li>상세설명 : " + $(this).find("etc").text()+"<p></li>";
			str += "<li><p></li>";
			var favbtn;
			
			if(favflag)
			{
				favbtn = "<a href='#' class='ui-btn' onclick='favdel();'>즐겨찾기 삭제</a> ";
			}
			else
			{
				
				favbtn = "<a href='#' class='ui-btn' onclick='favadd();'>즐겨찾기 추가</a>";
			}
				  
			$("#detail_div").append(str);
			$("#detail_div").listview("refresh");
			
			$("#favbtn").html(favbtn);
		
			return false;
			
			}   
	});
}
	
	
	

	

	
function mapView(lat,lan) {
	
	setlat = lat;
	setlan = lan;
	var latlngDC = new google.maps.LatLng( lat, lan); 
	    
	var mapOptions = { zoom: 16, center: latlngDC  };
	var map = null, marker = null; 
	    
	map = new google.maps.Map( document.getElementById('map'), mapOptions );
	    
	setTimeout(function(){google.maps.event.trigger(map, "resize");},200 );
	
		
	marker = new google.maps.Marker( { 
	       position: latlngDC,     
	       map: map,      
	       title: "표시" 
	});
	
	map.setCenter(marker.getPosition());
}


function setPathMap() {
	var mylatlngDC = new google.maps.LatLng( mylat, mylan);
	var latlngDC = new google.maps.LatLng( setlat, setlan);
		
	var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 13,
		    center: mylatlngDC,
	});
		  
	marker = new google.maps.Marker( { 
			position: latlngDC,     
	        map: map,      
	        title: "표시" 
	});
	
	marker = new google.maps.Marker( { 
	        position: mylatlngDC,     
	        map: map,      
	        title: "표시" 
	});
		
	directionsDisplay.setMap(map);
		   
	calculateAndDisplayRoute(directionsService, directionsDisplay);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		  directionsService.route({

			  origin: new google.maps.LatLng(mylat,mylan),
			  destination: new google.maps.LatLng(setlat,setlan),
			  travelMode: google.maps.TravelMode.TRANSIT
		  }, function(response, status) {
			  	if (status === google.maps.DirectionsStatus.OK) {
			  		directionsDisplay.setDirections(response);
			  	}
			  	else {
			  		window.alert('Directions request failed due to ' + status);
			  	}
		  });
}
	

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError,{enableHighAccuracy: false,maximumAge:60000, timeout:20000});

}
function showPosition(position) {

	mylat = position.coords.latitude ;
	mylan = position.coords.longitude;

}


function showError(error) {
 $("#map").text("지도 가져오기 오류");
}
	
	