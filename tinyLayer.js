import $ from 'jquery'

var tinyLayer = (function($){
  /**
   * 工具
   */
   var Tools = {
     currentPath : null,  // 当前路径
     assetsName : 'assets/',
     cssName : 'tinyLayer.css',
     jsName : 'tinyLayer.js'
   };

  /**
   * 获取当前路径
   */
  var js = document.scripts;
  for (var jsNum = 0, jsLen = js.length; jsNum < jsLen; jsNum++) {
      if (js[jsNum].src.indexOf(Tools.jsName) !== -1) {
          Tools.currentPath = js[jsNum].src.substring(0, js[jsNum].src.lastIndexOf("/") + 1);
      };
  };

  /**
   * 预处理，加载 css 到头部
   */
  $('head').append('<link rel="stylesheet" href='+ Tools.currentPath + Tools.cssName +'>');

  /**
   * js 事件处理
   */
   $('#custom-tinyLayer-wrap').ready(function(){
     if(callbackTag.success){
       setTimeout(function(){
         callbackTag.success();
       }, 0);
     };
   });

   $(document).on('click', '.custom-tinyLayer--content-close', function(event) {
     tinyLayer.close();
     if(callbackTag.cancel){
       setTimeout(function(){
         callbackTag.cancel();
       }, 0);
     };
   });

   $(document).on('click', '.custom-tinyLayer--content-btns--yes', function(event) {
     tinyLayer.close();
     if(callbackTag.yes){
       setTimeout(function(){
         callbackTag.yes();
       }, 0);
     };
   });

   $(document).on('click', '.custom-tinyLayer--content-btns--no', function(event) {
     tinyLayer.close();
   });

  //  延时关闭弹框
   var timeClose = function(time){
     setTimeout(function(){
       tinyLayer.close();
     }, time)
   };

  //  点击遮罩关闭弹框
   var shadeClose = function(){
     $(document).on('click', '.custom-tinyLayer--shade', function(event) {
       tinyLayer.close();
     });
   };

  //  参数回调，回调标记
  var callbackTag = {
    success: false,
    yes: false,
    cancel: false,
    end: false
  };

  /**
   * 对外接口
   */
  return {
    // 打开弹框
    open: function(argsObj){
      /**
       * HTML 模板处理
       */
      var poopupHtmlContainer = ['<div id="custom-tinyLayer-wrap">',
                                '   <div class="custom-tinyLayer--shade"></div>',
                                '   <div class="custom-tinyLayer--content">',
                                '     <a href="javascript:;"  class="custom-tinyLayer--content-close">',
                                '       <img src='+ Tools.currentPath + Tools.assetsName + 'close_icon.png' +' alt="" />',
                                '     </a>',
                                '     #template',
                                '   </div>',
                                '</div>'].join("");

      var tinyLayerHtmlContent = ['<h3 class="custom-tinyLayer--content-title">#title</h3>',
                              '<div class="custom-tinyLayer--content-body">',
                              '  <img src=#icon alt=""  class="custom-tinyLayer--content-icon"/>',
                              '  <div class="custom-tinyLayer--content-text">#content</div>',
                              '</div>',
                              '<div class="custom-tinyLayer--content-btns">#btns</div>'].join("");

      var tinyLayerBtnContent = ['<button type="button" class="custom-tinyLayer--content-btns--#btn">#text</button>',].join("");

      /**
       * 参数说明：
       * type: 弹框样式 [0 默认信息框模板, 1 用户自定义模板]
       * title: 弹框标题 text，
       * area: 弹框宽高 ['400px' 宽, '250px' 高],
       * icon: 弹框图标 ['warn', 'succ', 'error', 'info'],
       * closeBtn: 右上关闭按钮 [1 显示, 0 不显示].
       * btn: 弹框按钮 ['确定', '取消'],
       * content: 内容,
       * time: 自动关闭，0 为不自动关闭
       * shadeClose: 点击遮罩关闭 true/false
       * success: 弹出后回调
       * yes: 点击确定回调
       * cancel: 右上角关闭按钮触发的回调
       * end: 弹出框销毁后的回调
       */
      argsObj.type = argsObj.type || 0;
      argsObj.content = argsObj.content || '';
      argsObj.area = argsObj.area || ['390px', '202px'];
      argsObj.time = (Number(argsObj.time) !== 0 && !isNaN(Number(argsObj.time)))? Number(argsObj.time) : 0;
      argsObj.shadeClose = argsObj.shadeClose || false;
      argsObj.success = argsObj.success || false;
      argsObj.yes = argsObj.yes || false;
      argsObj.cancel = argsObj.cancel || false;
      argsObj.end = argsObj.end || false;

      if(Number(argsObj.type) === 0){
        argsObj.title = argsObj.title || '提示';
        argsObj.icon = argsObj.icon ? Tools.currentPath + Tools.assetsName + argsObj.icon + '_icon.png' : Tools.currentPath + Tools.assetsName + 'succ_icon.png';
        argsObj.closeBtn = argsObj.closeBtn || 1;
        argsObj.btn = argsObj.btn || ['确定'];

        var btns = [];
        argsObj.btn.reverse();
        for(var num = 0, len = argsObj.btn.length; num < len; num++){
          (function(){
            var btnCase = tinyLayerBtnContent.slice(0);
            if(num === len -1){
              btnCase = btnCase.replace(/#btn/, 'yes').replace(/#text/, argsObj.btn[num]);
            } else {
              btnCase = btnCase.replace(/#btn/, 'no').replace(/#text/, argsObj.btn[num]);
            };
            btns.push(btnCase);
          })();
        };

        tinyLayerHtmlContent = tinyLayerHtmlContent.replace(/#title/, argsObj.title).replace(/#icon/, argsObj.icon).replace(/#content/, argsObj.content).replace(/#btns/, btns.join(""));
        poopupHtmlContainer = poopupHtmlContainer.replace(/#template/, tinyLayerHtmlContent);

      } else if(Number(argsObj.type) === 1){
        poopupHtmlContainer = poopupHtmlContainer.replace(/#template/, argsObj.content);
      };

      $('body').append(poopupHtmlContainer);

      if(Number(argsObj.type) === 0){
        $('.custom-tinyLayer--content').addClass('custom-tinyLayer--content-default').css({
          width: argsObj.area[0],
          height: argsObj.area[1]
        });
      } else {
        $('#custom-tinyLayer-wrap').ready(function(){
          var $insertHtml = $('.custom-tinyLayer--content').children('.custom-tinyLayer--content-close').siblings();
          $('.custom-tinyLayer--content').css({
            width: $insertHtml.css('width'),
            height: $insertHtml.css('height')
          })
        });
      };

      if(argsObj.time !== 0){
        timeClose(argsObj.time);
      };
      if(String(argsObj.shadeClose) === 'true'){
        shadeClose();
      };
      if(argsObj.success){
        callbackTag.success = argsObj.success;
      };
      if(argsObj.yes){
        callbackTag.yes = argsObj.yes;
      };
      if(argsObj.cancel){
        callbackTag.cancel = argsObj.cancel;
      };
      if(argsObj.end){
        callbackTag.end = argsObj.end;
      };
    },

    // 销毁弹框
    close: function(){
      $('#custom-tinyLayer-wrap').remove();
      if(callbackTag.cancel){
        setTimeout(function(){
          callbackTag.end();
        }, 0);
      };
    }
  }
})(jQuery || window.jQuery || window.$);
