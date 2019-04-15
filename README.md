<b>开发过程中遇到的问题:</b>

<h4>1.定义一个搜索事件方法，在input标签和button上绑定，button不执行</h4>

   原因:定义样式时button为absolute，没有给层级，点击按钮的时候并未触发到button上
   
   解决办法:修改样式 给button加一个层级z-index：999
   
<h4>2.在使用定义的搜索方法时，回车搜索bindconfirm绑定此事件，正常执行，但是按钮绑定此事件bindtap不正常执行?</h4>

   原因:bindconfirm触发时有搜索字段传入，但bindtap绑定并未有
   
   解决办法：在data中定一个字段代表搜索字段,然后绑定到input 的value属性上,
   
   其次在button定义参数data-val="{{data中的搜索字段}}"传给事件方法，
   
   最后在搜索事件方法中获取搜索的字段  e.detail.value （绑定在input传的）或者 e.currentTarget.dataset.val（绑定在button传的）;
   
   进行判断字段是否存在列表中。
   
<h4>3.用obj.hasOwnProperty('val')判断obj对象是否包含val属性</h4>

<h4>4.使用本地存储wx.setStorageSync()存储购物车数据时，每次加入一个存一个，加入了多条数据时，但是最终获取的只有一条数据?</h4>

   原因:每次都重新定义数组为空，然后把新加入的数据到数组中，数组的长度始终保持一个
   
   解决办法: 定义一个数组，每次先使用wx.getStorageSync()获取到本地数据赋值给数组，
             之后把心添加的那条数据push到数组中，
			 最后用wx.getStorageSync()重新保存到数据库，即得到所要的结果
			 
<h4>5.使用wx.getStorageSync()获取本地数据时,若出现本地数据为空的时候，获取时出现错误?</h4>

   原因：数组赋值不规范
   
   解决办法:分两种情况给数组赋值，var list=wx.getStorageSync('list') || [];
   
<h4>6.若本地数据为空时，页面是空白，用户视觉效果很不好</h4>

	原因: 获取本地数据为空时，无数据渲染页面，出现空白.
	
	解决办法:若本地数据长度为0，则加载Mock的模拟数据
