


var d_name = "";

$(document).ready( function() {
		
		
       var url = "http://opendata.busan.go.kr/openapi/service/RentBike/getRentBikeInfoList?serviceKey=%2BX2qYlEt6l0Om6Ixc0wJi0Rnj5t7lX9p%2Bts0LxL5LSoedbZX15iTVBptBcjBbWKDExM6zqJ0r4M1HL9KAkfNwA%3D%3D&numOfRows=999&pageSize=999&pageNo=1&startPage=1";
       d_name = "";
      
        $.ajax({
             type: "GET",             
             url: url,
             cache: false,
             dataType: "xml",
             success: onSuccess
           });
		   
		weatherLoad();
		   
   });
   
 function onSuccess(data){ 
  var cnt = 1;
  var txtname = "";
  $("#lv1").text("");
  $(data).find("item").each(function () {
	  var str;
	  if(txtname == $(this).find("office").text()){
		  str  = "";
	  }		  
  	  
	  else{
		  txtname = $(this).find("office").text();
		  str = "<li data-role='list-divider'>"+$(this).find("office").text()+"</li>";
	  }
  
	  str += "<li><a href='#detail' onclick='detail_val("+cnt+");' id='"+cnt+"'><p>"+$(this).find("rentSite").text()+"</p></a></li>";
	  $("#lv1").append(str);
	  $("#lv1").listview("refresh");
   
	  cnt++;
	  if(cnt > 11)
		 return false;
	

   
  });
}

function detail_val(cnt){
	d_name = "detail.html?"+$("#"+cnt).text();

	d_name =  encodeURI(d_name, "UTF-8"); 
	location.href = d_name;
}





