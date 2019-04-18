(function(a, undefined) {
	a.toast = {
		// 隐藏的 setTimeOut 引用
		hideTimeOut: null,
		/**
		 * 显示Toast
		 * @param text 文本内容
		 * @param type 类型 success error
		 * @param duration 持续时间
		 */
		show: function(text, type, duration) {
            type = type || 'success';
			// 确保上一次的 TimeOut 已被清空
			if (this.hideTimeOut) {
				clearTimeout(this.hideTimeOut);
				this.hideTimeOut = null;
			}
			if (!text) {
				console.error('text 不能为空!');
				return;
			}
			var stToastId = $('#stToastId');
			if (stToastId.length<=0) {
				$('body').append($("<div id='stToastId' class='st-toast'><span class='st-toast-type'><i></i></span><span class='st-toast-text'>"+text+"</span></div>"));
                stToastId = $('#stToastId');
			}else{
				
			}
            var toastType = $("#stToastId .st-toast-type");
			$("#stToastId .st-toast-text").html(text || ''); // 文字
			switch (type) {
				case 'success':
                    toastType.attr('class','st-toast-type st-toast-success');
					break;
                case 'warning':
                    toastType.attr('class','st-toast-type st-toast-warning');
                    break;
				case 'error':
                    toastType.attr('class','st-toast-type st-toast-error');
					break;
				default:
                    toastType.attr('class','st-toast-type');
					break;
			}
            stToastId.css("margin-left","-"+(stToastId.width()/2+10)+"px");
            stToastId.fadeIn();
			// 不传的话默认2s
			var that = this;
			this.hideTimeOut = setTimeout(function() {
                stToastId.fadeOut();
				that.hideTimeOut = null; // 置 TimeOut 引用为空
			}, duration || 2000);
		},
		/**
		 * 隐藏 Toast
		 */
		hide: function() {
			// 如果 TimeOut 存在
			if (this.hideTimeOut) {
				// 清空 TimeOut 引用
				clearTimeout(this.hideTimeOut);
				this.hideTimeOut = null;
			}
			var stToastId = document.getElementById('stToastId');
			if (stToastId) {
				stToastId.style.display = 'none';
			}
		}
	};
})(window.App = window.App || {});
