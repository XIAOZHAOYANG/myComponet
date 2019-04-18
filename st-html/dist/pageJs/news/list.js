$(function (param) {
    page = 1;
    getList();
});

var page = 1,pageSize=10;
$("#titleId").on("keyup",function(event){
    if(event.keyCode ==13){
        page = 1;
        getList();
    }
});
// 初始化
var pageUpData = $("#pagearea").createPage({
    totalPage:Math.ceil(1/pageSize),
    currPageSize:pageSize,
    currPage:page,
    backFn:function(currPage,currPageSize){
        page = currPage;
        pageSize = currPageSize;
        getList();
    }
});
// 获取列表数据
function getList(){
    var title = $("#titleId").val();
    $.ajax({
        url: '/news/getList',
        data: {
            "title" : title,
            "page" : page,
            "pageSize" : pageSize
        },
        type: 'post',
        success: function (data) {
            if(data.code==0){
                pageUpData({totalPage:Math.ceil(data.data.count/pageSize),currPageSize:pageSize,currPage:page});
                var _html=template('templateId',data.data);
                $("#tableId").html(_html);
            }else{
                App.toast.show(data.msg, 'error');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            App.toast.show('服务器繁忙，请稍后再试!', 'error');
        }
    });
}

// 删除
function delItem(id){
    App.confirm({
        "title": "温馨提示",
        "text": "您确定删除此新闻？",
        "type": "warning",
        "callback": function(item) {
            $.ajax({
                url: '/news/delNews',
                data: {
                    "id": id
                },
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if(data.code==0){
                        App.toast.show("删除成功！", 'success');
                        getList();
                    }else{
                        App.toast.show(data.msg, 'error');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    App.toast.show('服务器繁忙，请稍后再试!', 'error');
                }
            });
        }
    });
}


