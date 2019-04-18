// 上传图片
$(".st-file-updata").on("change",".st-file-updata-content input",function(e){
  var _tp = $(this).parent();
  var _text = "";
  try{
    _text = $(this)[0].files[0].name;
  }catch(errer){
    _text = $(this).val();
  }
  if(!/\w(\.jpeg|\.png|\.jpg)/i.test(_text)){
    App.toast.show("仅支持JPG、PNG、JPEG的图片格式", 'error', 2000);
    return;
  }
  var _html = $("<li><span>"+_text+"</span><i></i></li>");
  _html.append($(this));
  var _accept = _tp.attr("data-accept");
  if(_accept&&_accept.length>0){
    _tp.append("<input type='file' accept='"+_accept+"' />");
  }else{
    _tp.append("<input type='file'/>");
  }
  if(_tp.attr("data-multiple")=="true"){
    _tp.next().append(_html);
  }else{
    _tp.next().html(_html);
  }
});
// 删除
$(".st-file-updata").on("click",".st-file-content i",function(e){
  $(this).parent().remove();
});