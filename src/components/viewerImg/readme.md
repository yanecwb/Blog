功能
1.图片的放大预览
2.自定义的图片列表
3.翻页
4.放大缩小

1.父的组件使用showimg响应式数据(boolean)控制显示隐藏 ，并在父组件内点击图片显示(showimg = true)
2.传入自定义事件，hideImg修改showimg = false
3.传入props名为options是一个对象 => :options='{contentImgUl,contentImgUrl}. 其中contentImgUl为图片列表数据格式应为[{url:xxx}],contentImgUrl为当前点击查看的图片Url

