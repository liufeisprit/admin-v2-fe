//页面路由
window.location.href='baidu.com'
history.back()
//hash路由
window.location='#hash'
window.onhashchange=function(){
    console.log('cur hash',this.location.hash)
}
//h5 路由
//推进一个状态
history.pushState('test','','/path')
//替换一个状态
history.replaceState('test','','path1')
window.onpopstate=function(){
    console.log(window.location.href)
    console.log(window.location.pathname)
    console.log(window.location.hash)
    console.log(window.location.search)
}