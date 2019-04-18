$("body").on("click", ".btn", function() {
  var _this = $(this);
  _this.attr("btn-animation",true);
  setTimeout(function(){
    _this.removeAttr("btn-animation");
  },2000);
});


