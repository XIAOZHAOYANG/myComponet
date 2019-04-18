(function(a, undefined) {
	a.confirm = function(o) {
		var op = {
			title: "温馨提示",
			text: "确定删除？",
			type: "success",
			callback: null,
			btnText: '确定'
		};
		var parameter = $.extend(op, o);
		var html = $('<div class="confirm-mode">                ' +
			'   <div class="confirm-content">                     ' +
			'   <div class="confirm-header"><i class="confirm-type st-confirm-success"></i> ' + parameter.title + '</div>' +
			'       <div class="confirm-body">                    ' +
			'           <p class="ft26">' + parameter.text + '</p>    ' +
			'       </div>                                        ' +
			'       <div class="confirm-footer ftn14 pt10">             ' +
			'           <button class="btn btn-default confirm-cancel">取消</button>' +
			'           <button class="btn btn-primary confirm-define">' + parameter.btnText + '</button>' +
			'       </div>                                        ' +
			'   </div>                                            ' +
			'</div>');
		var confirmType = html.find('.confirm-type');
		switch (parameter.type) {
			case 'success':
				confirmType.attr('class', 'confirm-type st-confirm-success');
				break;
			case 'warning':
				confirmType.attr('class', 'confirm-type st-confirm-warning');
				break;
			case 'error':
				confirmType.attr('class', 'confirm-type st-confirm-error');
				break;
			default:
				break;
		}
		html.find(".confirm-define").click(function(e) {
			if (op.callback && typeof(op.callback) == "function") {
				op.callback(e);
			}
			html.remove();
		});
		$(document.body).on("click", ".confirm-cancel", function(e) {
			html.remove();
		});
		$(document.body).append(html);
	};
})(window.App = window.App || {});
