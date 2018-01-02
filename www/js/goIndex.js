

function goApp(){
	location.href = "around.html";
}

function doBlink(){
	
		$("#blink").css("visibility","");
		
		setTimeout("doHidden()",700);
}

function doHidden(){
	
		$("#blink").css("visibility","hidden");
		
		setTimeout("doBlink()",700);
}

$(document).ready( function() {
	doBlink();
	setTimeout(goApp,5000);
});