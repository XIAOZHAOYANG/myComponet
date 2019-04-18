(function(a, undefined) {
	a.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
    a.checkAuth = function(attrList){
        var attr = null;
        $.ajax({
            url: "/checkAuth",
            data: {
                url:attrList
            },
            type:'POST',
            async: false,
            dataType: "json",
            success: function (res) {
                if(res.code == 0 ){
                    attr =  res.data;
                }else{
                    App.toast.show(res.msg, 'error');
                    attr = {};
                }
            }
        });
        return attr;
    };
})(window.App = window.App || {});