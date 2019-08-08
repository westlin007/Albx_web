$(function(){
    let menuPosts = $('#menu-posts')
    let menuSettings = $('#menu-settings')

    let index = location.href.indexOf('?')
    let routerName = '';
    if(index == -1){
        routerName = location.href.substring(location.href.lastIndexOf('/')+1)
    }else{
        routerName = location.href.substring(location.href.lastIndexOf('/'),location.href.indexOf('?'))
    }
    console.log(routerName);
    if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
        menuPosts.addClass('in').attr('aria-expanded',true)
        // console.log(menuPosts.siblings('.collapsed'));
        // menuPosts.parent().find('.collapsed')
        // menuPosts.siblings('.collapsed').removeClass('collapsed') 
    }
    if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
        // 3.实现展开
        menuSettings.addClass('in').attr('aria-expanded',true)
    }

    $('#'+routerName).addClass('active')

})