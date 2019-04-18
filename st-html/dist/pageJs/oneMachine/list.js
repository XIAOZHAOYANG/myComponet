$(function (param) {
    page = 1;
    getList();
});

var page = 1,pageSize=10;
$("#noId,""#deviceNoId,""#macAddressId").on("keyup",function(event){
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
    var no = $("#noId").val();var deviceNo = $("#deviceNoId").val();var macAddress = $("#macAddressId").val();
    $.ajax({
        url: '/oneMachine/getList',
        data: {
            "no" : no,"deviceNo" : deviceNo,"macAddress" : macAddress,
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


