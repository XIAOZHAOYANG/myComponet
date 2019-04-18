(function(a, undefined) {
	a.verify = {
		// 是否是http或者https开头
		checkUrl:function(item){
		    if(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(item)){
                return true;
		    }else{
                return false;
		    }
		},
        // 验证身份证号
        isCardNo:function(item){
            if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(item)){
            	return true;
            }else{
            	return false;
            }
        },
		// 字母验证
		letter:function (item) {
            if(/^[A-Za-z]+$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 百分比 0.01-99.99
        percentage:function(item){
            if(/^(100|[1-9]?\d(\.\d?\d?)?)$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 数字验证 (正整数)
        number:function(item){
            if(/^[0-9]+$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 金额验证
        money:function(item){
            if(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 电话验证
        phone:function(item){
            if(/^[1][1-9]{1}[0-9]{9}$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 密码验证 必须有大写字母
        pwd:function(item){
            if(/^(?=.*[A-Z])(?=.*\d)[^]{8,20}$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 密码验证  必须有大写或者小写字母
        pwdCase:function(item){
            if(/^(?=.*[a-zA-Z])(?=.*\d)[^]{8,20}$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 半角字符验证
        semiangle:function(item){
            if(/[\uFF00-\uFFEF]/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 文字，数字，字母 (不能输入字符)
        noCharacter:function(item){
            if(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 小写字母，数字
        lowerCaseNumber:function(item){
            if(/^[a-z\d]+$/.test(item)){
                return true;
            }else{
                return false;
            }
        },
        // 是否为空
        isNull:function(item){
            if(item.trim()==null||item.trim()==""){
                return true;
            }else{
                return false;
            }
        }
	};
})(window.App = window.App || {});