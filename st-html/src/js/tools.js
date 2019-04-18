(function(a, undefined) {
	a.tools = {
		// 日期转换
		dateConvert:function(item){
		    if(item==0 || item==null || item==""){
	            return '';
	        }
	        var date = new Date(item*1000);
	        var y = date.getFullYear();
	        var m = date.getMonth() + 1;
	        m = m < 10 ? ('0' + m) : m;
	        var d = date.getDate();
	        d = d < 10 ? ('0' + d) : d;
	        return y + '-' + m + '-' + d;
		},
		// 日期时间转变
		dateTimeConvert:function(item){
			if(item==0 || item==null || item==""){
	            return '';
	        }
			var date = new Date(item*1000);
		    var y = date.getFullYear();
		    var m = date.getMonth() + 1;
		    m = m < 10 ? ('0' + m) : m;
		    var d = date.getDate();
		    d = d < 10 ? ('0' + d) : d;
		    var h = date.getHours();
		    h = h < 10 ? ('0' + h) : h;
		    var minute = date.getMinutes();
	        var second = date.getSeconds();
		    minute = minute < 10 ? ('0' + minute) : minute;
	        second = second < 10 ? ('0' + second) : second;
	        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		}
	};
})(window.App = window.App || {});