$(function(){
    $('#btnlogin').on('click',function(){
        $.ajax({
            type:'post',
            url:'/login',
            datatype:'json',
            data:$('form').serialize(),
            success:function(res){
                console.log(res);
                if(res.code == 400){
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                }else
                if(res.code == 200){
                    // 进行页面跳转
                    alert(res.msg);
                    location.href='/admin'
                }
            }
        })
    })
})