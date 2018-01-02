
var fav = [];
var cnt = 1;
var db;

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
    
    setlist();
}

function setlist(){
	
		$("#lv1").html("");
		for(i = 0; i < fav.length; i++)
		{

			var str = "<li><a href='#detail' onclick='detail_val("+cnt+");' id='"+cnt+"'><p>"+fav[i]+"</p></a></li>";
			 $("#lv1").append(str);
			 $("#lv1").listview("refresh");
			 cnt++;
		}
	
	
}
function detail_val(cnt){
	d_name = "detail.html?"+$("#"+cnt).text();
	d_name =  encodeURI(d_name, "UTF-8"); 
	location.href = d_name;
}


$(document).ready( function() {
	
	openDB();
	weatherLoad();
	
 
});


