(function(w,d) {
w.timeout=30000;//请求超时时长
/*!设备**/
if(navigator.userAgent.indexOf('Android') > -1){
	w.nativeTYPE='ANDROID';
}else if(navigator.userAgent.indexOf('iPhone') > -1||navigator.userAgent.indexOf('iPad') > -1){
	w.nativeTYPE='IOS';
}else{
	w.nativeTYPE='PC';
}

/*!dom查找封装**/
w.getId=function(id){
	return d.getElementById(id);
};
w.qs=function(selecter,em){
	return em?em.querySelectorAll(selecter):d.querySelectorAll(selecter);
};
w.q=function(selecter,em){
	return em?em.querySelector(selecter):d.querySelector(selecter);
};

/*!page common event**/
mui('body').on('tap','.mui-back',function(){
	history.back();
});
mui('body').on('tap','.error',function(){
	document.body.removeChild(q('.error'));
	if(w.reqError){
		reqError();
	}
});

/*!dom  get fg**/
w.getFragment=function(dom){
	//创建一个文档碎片
	var fragment = document.createDocumentFragment();
	if(!dom){
		return fragment;
	}
	if(typeof dom === 'object'){
		fragment.appendChild(dom);
		return fragment;
	}
	dom=parseDom(dom);
	for(var i=0,len=dom.length;i<len;i++){
		fragment.appendChild(dom[i]); 
	}
	return fragment;
	
}
w.parseDom=function(innerHTML){
　　 var div = document.createElement('div');
　　 div.innerHTML = innerHTML;
	var childs=div.childNodes;
	var reNodes=[];
	//清理掉空格回车造成的 空白node
	for ( var i = 0,len=childs.length;i<len;i++){
        if (childs[i].nodeName !== "#text") {
        	reNodes[reNodes.length]=childs[i];
        }
    } 
　　 return reNodes;
};

/*!json **/
w.ts=function(jsonObj,msg){
	if(msg){
		return msg+':'+JSON.stringify(jsonObj);
	}else{
		return JSON.stringify(jsonObj);
	}
	
};
w.tb=function(str){
	return JSON.parse(str);
};

/*!show msg **/
w.showMsg=function(msg){
	msg||(msg='网络超时');
	msg='网络繁忙，请稍后再试!';
	//console.log(msg);
	mui.toast(msg);
};

/*!req get **/
w.ctx={
	setSid:function(sid){
		localStorage.setItem('sid',sid);
	},
	getSid:function(){
		return localStorage.getItem('sid');
	},
	getUpData:function(){
		var option=localStorage.getItem('up-data')||'{}';
		return tb(option);
	},
	setNextData:function(option){
		option||(option={});
		localStorage.setItem('up-data',ts(option));
	}
     
};
w.getQueryString=function(name){
		 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
};

/*!page  loading **/
w.showWaiting=function(){
	var f=document.createDocumentFragment();
	var ld=document.createElement('div');
	ld.className='waiting';
	ld.innerHTML='<div class="wrap"><span class="spinner"></span><i class="spinner-in"></i></div>';
	f.appendChild(ld);
	document.body.appendChild(f);
};
w.closeWaiting=function(){
	var wt=q('.waiting');
	if(wt){
		document.body.removeChild(wt);
	}
};

/*!page  template **/
w._templatePage=function(sel,temp,data,reload){
	 var fragment=getFragment(template(temp,data));
	 reload&&(q(sel).innerHTML='');
	 q(sel).appendChild(fragment);
	 
}
w._error=function(){
	document.body.appendChild(getFragment('<div id="page-error" class="error"><div class="reqError" data-tg="1"><p>网络异常,请点击重试!</p><i></i></div></div>'));
}
/*!
 * ===========================================
 * 解决安卓后退 出现死循环问题
 * ===========================================
 */
if(nativeTYPE=='ANDROID'&&w.android&&android.goBack){
	mui.back=function(){
		android.goBack();
	}
}

})(window,document);

/*!重写 mui toast **/
(function($, window) {
	/**
	 * 自动消失提示框
	 */
	$.toast = function(message,position) {
		if($.os.plus){
			//默认显示在底部
			plus.nativeUI.toast(message,{verticalAlign:position});
		}else{
			var toast = document.createElement('div');
			toast.style.cssText='position:fixed;z-index:9999;height: auto;overflow: hidden;width: 80%;left: 50%;margin-left: -40%;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center;padding:0px;bottom: 55px;';
			toast.innerHTML = '<div style="padding: 8px 20px;margin: 0px;color: #fff;background-color: #333;display: inline-block;word-break:break-all;border-radius: 15px;line-height: normal;line-height: 16px;font-size: 14px;">'+message+'</div>';
			document.body.appendChild(toast);
			setTimeout(function(){
		  		document.body.removeChild(toast);
			},2000);
		}
	};
})(mui, window);