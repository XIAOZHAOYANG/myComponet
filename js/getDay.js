/*获取当前日期  格式：yyyy-mm-dd hh:mm:ss*/

/*
 *参数1 format 日期格式   默认为 yyyy:mm:dd  可选格式：  yyyy:mm:dd hh:mm:ss  参数不区分大小写
 * */
function getCurrentDate(format){
	var date = new Date();
	//年
	var year = date.getFullYear();
	//月 
	var month = date.getMonth() + 1;
	//日
	var day = date.getDate();
	//时
	var hour = date.getHours();
	//分
	var minutes = date.getMinutes();
	//秒
	var seconds = date.getSeconds();
	//
	var currentDate = "";
	if(month < 10){
		month = "0" + month;
	}
	if(day < 10){
		day = "0" + day;
	}
	if(hour < 10){
		hour = "0" + hour;
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	var str = 'yyyy:mm:dd hh:mm:ss'.replace(" ","").toUpperCase();
	if(format){
		format = format.replace(" ","").toUpperCase();
		if(format === str){
			currentDate = year + "-" + month + "-"  + day + " " + hour + "-" + minutes + "-" + seconds;
			return currentDate;
		}
	}
	currentDate = year + "-" + month + "-"  + day ;
	return currentDate;  
}
//alert(getCurrentDate('yyyy:mm:dd hh:mm:SS'));  
//alert(getCurrentDate('yyyy:mm:dd'));
