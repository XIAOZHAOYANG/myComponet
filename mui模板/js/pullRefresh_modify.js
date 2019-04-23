mui.init();
			(function(mui) {
				//阻尼系数
				var deceleration = mui.os.ios?0.003:0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration:deceleration
				});
				mui.ready(function() {
					//循环初始化所有下拉刷新，上拉加载。
					mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
						mui(pullRefreshEl).pullToRefresh({
							down: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										var ul = self.element.querySelector('.mui-table-view');
										type = 1;
										toLoad("#ul"+(index+1));
									}, 1000);
								}
							},
							up: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										var ul = self.element.querySelector('.mui-table-view');
										type = 2;
										toLoad();
									}, 1000);
								}
							}
						});
					});
//					var createFragment = function(ul, index, count, reverse) {
//						var length = ul.querySelectorAll('li').length;
//						var fragment = document.createDocumentFragment();
//						var li;
//						for (var i = 0; i < count; i++) {
//							li = document.createElement('li');
//							li.className = 'mui-table-view-cell';
//							li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
//							fragment.appendChild(li);
//						}
//						return fragment;
//					};
				});
			})(mui);
			
			var baseUrlRH = "http://192.168.2.107:35080/puhuihuaPboc";

			try {
			     localStorage.setItem('token', "59b42d0af442426da1a6efca8e5de641_app");
			     localStorage.setItem('phone', "13882030888");
			} catch (e) {
			
			}
			var token = localStorage.getItem('token');
			var phone = localStorage.getItem('phone');
			toLoad("#ul1","#box1");
			type = 1;
			function toLoad(ul,box){
				$.ajax({
			        url:baseUrlRH + '/app/unionService/issueList',
			        type:'post',  
			        data:{
			            token: token,
			        	phone:phone,
					   	theirChannel:'mz',
					   	chilChannel:'',
					   	article:0,
					   	pageNo:1,
					   	pageSize:20
			        },
			        success:function(data) {
			        	if(data.data && data.data.length > 0){
			        		var jsonData = data.data;
			//      		ul.removeAttribute('data-imagelazyload');
			        		if(type == 1){//下拉刷新
			        			
		        				$(template).tmpl(jsonData).appendTo(ul);
			        			mui(box).pullRefresh().endPulldownToRefresh();
			        		}else{//上拉加载
			        			$(template).tmpl(jsonData).appendTo(ul);
			        			mui(box).pullRefresh().endPullupToRefresh(false);
			        		}
							
			        	}else{
			      			  mui(box).pullRefresh().endPulldownToRefresh();
			//				  mui(pullrefresh).pullRefresh().endPulldown();
			//				  mui(pullrefresh).pullRefresh().enablePullupToRefresh();
							  mui(box).pullRefresh().endPullupToRefresh(true);
			        	}
			        	
			        	
			        },
			        error: function (jqXHR, textStatus, errorThrown) {
			            mui.toast("请求失败！"); 
			        }
			    },"json"); 
			}