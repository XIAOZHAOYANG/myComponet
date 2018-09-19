/*验证码组件js*/
$(function(){
	//获取随机字母或数字
	var font = toinit();
	$("#btn4").on("click",function(){
		font = toinit();
	});
	$("#btn6").on("click",function(){
		var value = $("#inp").val().trim().toUpperCase();
		if(font === value){
			alert("验证成功");
		}else{
			alert("你输入的验证码错误");
		}
	});
	//canvas绘制验证码
	//1.新建一个函数产生随机数
	function rn(min,max){
	    return  parseInt(Math.random()*(max-min)+min);
	}
	//2.新建一个函数产生随机颜色
	function rc(min,max){
	    var r=rn(min,max);
	    var g=rn(min,max);
	    var b=rn(min,max);
	    return "rgb("+ r +"," + g + "," +b + ")";
	}
	
	function toinit(){
		//3.填充背景颜色，背景颜色要浅一点
		var w=120;
		var h=40;
		var c1 = $("#mycanva").get(0);
		var ctx=c1.getContext("2d");
		ctx.fillStyle=rc(180,230);
		ctx.fillRect(0,0,w,h);
		
		//4.随机产生字符串
		var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
		var fonts = "";
		for(var i=0;i<4;i++){
		    var c=pool[rn(0,pool.length)];//随机的字
		    var fs=rn(18,40);//字体的大小
		   var deg=rn(-30,30);//字体的旋转角度
		    ctx.font=fs+'px Simhei';
		    ctx.textBaseline="top";
		    ctx.fillStyle=rc(80,150);
		    ctx.save();
		    ctx.translate(30*i+15,15);
		   ctx.rotate(deg*Math.PI/180);
		    ctx.fillText(c,-15+5,-15);
		    ctx.restore();
		    fonts +=c;
		}
		
		//5.随机产生5条干扰线,干扰线的颜色要浅一点
		for(var i=0;i<5;i++){
		    ctx.beginPath();
		    ctx.moveTo(rn(0,w),rn(0,h));
		    ctx.lineTo(rn(0,w),rn(0,h));
		    ctx.strokeStyle=rc(180,230);
		    ctx.closePath();
		    ctx.stroke();
		}
		
		//6.随机产生40个干扰的小点
		for(var i=0;i<40;i++){
		    ctx.beginPath();
		    ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
		    ctx.closePath();
		    ctx.fillStyle=rc(150,200);
		    ctx.fill();
		}
		return fonts; 
	}
});
