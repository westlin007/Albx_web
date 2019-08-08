$(function(){
    $.ajax({
        url:'/getAllPost',
        type:'get',
        data:{
            pageNum:1,
            pageSize:5,
        },
        success:function(result){
            console.log(result);
            let html = template('postListTemp',result)
            $('tbody').html(html);
        }
    })
})