开发过程中遇到的问题:
1.定义一个搜索事件方法，在input标签和button上绑定，button不执行
   原因:定义样式时button为absolute，没有给层级，点击按钮的时候并未触发到button上
   解决办法:修改样式 给button加一个层级z-index：999
2.在使用定义的搜索方法时，回车搜索bindconfirm绑定此事件，正常执行，但是按钮绑定此事件bindtap不正常执行?
   原因:bindconfirm触发时有搜索字段传入，但bindtap绑定并未有
   解决办法；在data中定一个字段代表搜索字段,然后绑定到input 的value属性上,
   其次在button定义参数data-val="{{data中的搜索字段}}"传给事件方法，
   最后在搜索事件方法中获取搜索的字段  e.detail.value （绑定在input传的）或者 e.currentTarget.dataset.val（绑定在button传的）;
   进行判断字段是否存在列表中。
3.用obj.hasOwnProperty('val')判断obj对象是否包含val属性