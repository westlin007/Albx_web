$(function(){
    $.ajax({
        url:'/getAllCate',
        dataType:'json',
        success:function(res){
            $('tbody').html(template('cateListTemp',res))
        }
    })
})