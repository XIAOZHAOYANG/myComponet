(function($){
    var ms = {
        init:function(totalsubpageTmep,args){
            return (function(){
                ms.fillHtml(totalsubpageTmep,args);
                ms.bindEvent(totalsubpageTmep,args);
            })();
        },
        //填充html
        fillHtml:function(domContent,args){
            return (function(){
                if(args.totalPage<=0){
                    args.totalPage=1;
                }
                var totalsubpageTmep="";
                // 上一页
                if(args.currPage==1){
                	totalsubpageTmep += "<li class='ali'><span class='page_prev page_disabled'></span></li>";
                }else{
                	totalsubpageTmep += "<li class='ali'><span data-val='"+parseInt(args.currPage-1)+"' class='page_prev'></span></li>";
                }
                // 页码大于等于4的时候，添加第一个页码元素
                if(args.currPage!=1 && args.currPage>=4 && args.totalPage!=4) {
                    totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+1+"</a></li>";
                }
                /* 当前页码>4, 并且<=总页码，总页码>5，添加“···”*/
                if(args.currPage-2>2 && args.currPage<=args.totalPage && args.totalPage>5) {
                    totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_' data-go='' >...</a></li>";
                }
                /* 当前页码的前两页 */
                var start = args.currPage-2;
                /* 当前页码的后两页 */
                var end = args.currPage+2;

                if((start>1 && args.currPage<4) || args.currPage==1) {
                    end++;
                }
                if(args.currPage>args.totalPage-4 && args.currPage>=args.totalPage) {
                    start--;
                }
                for(; start<=end; start++) {
                    if(start<=args.totalPage && start>=1) {
                        if(start==args.currPage){
                            totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager active' data-go='' >"+start+"</a></li>";
                        }else{
                            totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+start+"</a></li>";
                        }
                    }
                }
                if(args.currPage+2<args.totalPage-1 && args.currPage>=1 && args.totalPage>5) {
                    totalsubpageTmep += "<li class='ali'><span class='geraltTb_omit' data-go='' >...</span></li>";
                }

                if(args.currPage!=args.totalPage && args.currPage<args.totalPage-2 && args.totalPage!=4) {
                    totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+args.totalPage+"</a></li>";
                }
                // 下一页
                if(args.currPage==args.totalPage){
                    totalsubpageTmep += "<li class='ali'><span class='page_next page_disabled'></span></li>";
                }else{
                    totalsubpageTmep += "<li class='ali'><span data-val='"+parseInt(args.currPage+1)+"' class='page_next'></span></li>";
                }
                $(domContent).find(".pagination").html(totalsubpageTmep);
                var _selectPageSize = $("<div class='pageSizeSelect'><span>每页</span><select><option value='10' selected='selected'>10</option><option value='30'>30</option><option value='50'>50</option></select><span>条</span></div>");
                _selectPageSize.find("option[value='"+args.currPageSize+"']").attr("selected",true);
                $(domContent).find(".pagination").siblings('.pageSizeSelect').remove();
                $(domContent).find(".pagination").before(_selectPageSize);
            })();
        },
        //绑定事件
        bindEvent:function(totalsubpageTmep,args){
            return (function(){
                totalsubpageTmep.on("click","a.geraltTb_pager",function(event){
                    var current = parseInt($(this).text()),_currPageSize=$(this).parents(".pagination").prev().find('select').val();
//                  ms.fillHtml(totalsubpageTmep,{"currPage":current,"totalPage":args.totalPage,"currPageSize":args.currPageSize,"turndown":args.turndown});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current,_currPageSize);
                    }
                });
                totalsubpageTmep.on("click","span.page_prev:not(.page_disabled)",function(event){
                    var _current = parseInt($(this).attr('data-val')),_currPageSize=$(this).parents(".pagination").prev().find('select').val();
//	                	ms.fillHtml(totalsubpageTmep,{"currPage":_current,"totalPage":args.totalPage,"currPageSize":args.currPageSize,"turndown":args.turndown});
	                	if(typeof(args.backFn)=="function"){
	                		args.backFn(_current,_currPageSize);
	                	}
                });
                totalsubpageTmep.on("click","span.page_next:not(.page_disabled)",function(event){
                    var _current = parseInt($(this).attr('data-val')),_currPageSize=$(this).parents(".pagination").prev().find('select').val();
//	                	ms.fillHtml(totalsubpageTmep,{"currPage":_current,"totalPage":args.totalPage,"currPageSize":args.currPageSize,"turndown":args.turndown});
	                	if(typeof(args.backFn)=="function"){
	                		args.backFn(_current,_currPageSize);
	                	}
                });
                totalsubpageTmep.on("change","select",function(event){
	                	var _current =1,_currPageSize=$(this).val();
//	                	ms.fillHtml(totalsubpageTmep,{"currPage":_current,"totalPage":args.totalPage,"currPageSize":_currPageSize,"turndown":args.turndown});
	                	if(typeof(args.backFn)=="function"){
	                		args.backFn(_current,_currPageSize);
	                	}
                });
            })();
        },
        updataPage:function(totalsubpageTmep,args){
    			ms.fillHtml(totalsubpageTmep,{"currPage":args.currPage,"totalPage":args.totalPage,"currPageSize":args.currPageSize});
        }
    };
    $.fn.createPage = function(options){      
    		var _this = this;
        ms.init(this,options);
        return function(args){
        		return ms.updataPage(_this,args);
        };
    };
})(jQuery);