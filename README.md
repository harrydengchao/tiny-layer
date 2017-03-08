> * 这是一个弹框组件 依赖jQ，

### 引入方式
```javascript
<script src="[path]/tinyLayer/tinyLayer.js"></script>
```
> * 只需引入js文件即可

### 打开与关闭
> * 打开弹窗： tinyLayer.open({option})
> * 关闭弹窗： tinyLayer.close()

### 参数说明：
window.tinyLayer.open({option})

> * type: 弹框样式 Number [0 默认信息框模板, 1 用户自定义模板]
> * title: 弹框标题 String，
> * area: 弹框宽高 Array ['400px', '250px'],
> * icon: 弹框图标 String ['warn', 'succ', 'error', 'info'],
> * closeBtn: 右上关闭按钮 Number [1 显示, 0 不显示].
> * btn: 弹框按钮 Array ['确定', '取消'],
> * content: 内容 String,
> * time: 自动关闭，0 为不自动关闭 Number ms
> * shadeClose: 点击遮罩关闭 true/false
> * success: 弹出后回调 function
> * yes: 点击确定回调 function
> * cancel: 右上角关闭按钮触发的回调 function
> * end: 弹出框销毁后的回调 function

### 使用预定义模板
```javascript
  window.tinyLayer.open({
    title: '发送成功',
    icon: 'succ',
    content: args,
    time: 2000
  });
```

### 使用自定义HTML
```javascript
    var popupHtml = ['<div class="yaoqimga-wrap">',
                    '  <div class="yaoqimga--head">',
                    '    <span class="yaoqimga--head-text">',
                    '      你可以通过一下途径获取邀请码',
                    '    </span>',
                    '  </div>',
                    '  <div class="yaoqimga">',
                    '    <div class="yaoqimga--title">',
                    '      1、关注微信公众号获取邀请码',
                    '    </div>',
                    '    <div class="yaoqimga--imgs">',
                    '      <div class="yaoqimga--imgs-left">',
                    '        <img src="{$resource_basic}dist/img/login/qgly.png">',
                    '        <span class="yaoqimga--imgs-text">青果乐园</span>',
                    '      </div>',
                    '      <div class="yaoqimga--imgs-right">',
                    '        <img src="{$resource_basic}dist/img/login/xq.png">',
                    '        <span class="yaoqimga--imgs-text">好友小青</span>',
                    '      </div>',
                    '    </div>',
                    '    <div class="yaoqimga--title">',
                    '      2、通过合作机构获取邀请码',
                    '    </div>',
                    '  </div>',
                    '</div>'].join("");
	tinyLayer.open({
	type: 1,
	shadeClose: true,
	content: popupHtml
	});
```