
var d_name = "";
var mylat, mylan;

function getLocation() {
	var options = {timeout:60000};
    navigator.geolocation.getCurrentPosition(showPosition, showError,options);
	

}
function showPosition(position) {
	mylat = position.coords.latitude ;
	mylan = position.coords.longitude;
	xmlLoad();
}


function showError(error) {
     $("#map").text("지도 가져오기 오류");
}



$(document).ready( function() {

	getLocation(); 
  	weatherLoad();
   });
   
   
   
   function xmlLoad(){
		var url = "http://opendata.busan.go.kr/openapi/service/RentBike/getRentBikeInfoDetail?serviceKey=%2BX2qYlEt6l0Om6Ixc0wJi0Rnj5t7lX9p%2Bts0LxL5LSoedbZX15iTVBptBcjBbWKDExM6zqJ0r4M1HL9KAkfNwA%3D%3D&numOfRows=999&pageSize=999&pageNo=1&startPage=1";
       d_name = "";
      
        $.ajax({
             type: "GET",             
             url: url,

             cache: false,
             dataType: "xml",
             success: onSuccess
           });
   
   }
   
   function onSuccess(data){ 
  var cnt = 1;
  var limit = 1;
  var arrPos = new Array();

  $("#lv1").text("");
  $(data).find("item").each(function () {
		var lat = $(this).find("lati").text();
		var lan = $(this).find("longi").text();
	
		var dis = calDistance(mylat, mylan, lat, lan);
	
		if(dis <= 5)
		{
			 var str = "<li><a href='#detail' onclick='detail_val("+cnt+");' id='"+cnt+"'><p>"+$(this).find("rentSite").text()+"/  "+dis+"km  </p></a></li>";
		 	 $("#lv1").append(str);
			 $("#lv1").listview("refresh");
			 cnt++;
		}
	
		if(limit > 11)
			 return false;
		
		limit++;
		
	
   });
	if(cnt == 1)
	{
		var str = "<li>주변에 자전거 대여소가 없습니다.</li>";
		$("#lv1").append(str);
		 $("#lv1").listview("refresh");
	}
  
 
  
}

function detail_val(cnt){

	var text = $("#"+cnt).text().split("/");
	d_name = "detail.html?"+text[0];
	d_name =  encodeURI(d_name, "UTF-8"); 
	location.href = d_name;
}

function calDistance(lat1,lon1,lat2, lon2){  
    
    var theta;
    var dist;  
    theta = lon1 - lon2;  
    dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))   
          * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));  
    dist = Math.acos(dist);  
    dist = rad2deg(dist);  
      
    dist = dist * 60 * 1.1515;   
    dist = dist * 1.609344;    // 단위 mile 에서 km 변환.  
    //dist = dist * 1000.0;      
    // 단위  km 에서 m 로 변환  
  	dist = Math.round(dist);
  	
  	
    return dist;  
}  
  
    // 주어진 도(degree) 값을 라디언으로 변환  
function deg2rad(deg){  
    return parseFloat(deg * Math.PI / parseFloat(180));  
}  
  
    // 주어진 라디언(radian) 값을 도(degree) 값으로 변환  
function rad2deg(rad){  
    return parseFloat(rad * parseFloat(180) / Math.PI);  
} 



