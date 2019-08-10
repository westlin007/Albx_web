$(function(){
    $('#feature').on('change',function(){
        var myfile = document.querySelector('#feature').files[0]
        var formdata = new FormData()
        formdata.append('img',myfile)
        formdata.append('username','jack')
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            contentType:false, // 让ajax不要进行数据的编码处理，因为我想让formdata来处理
            processData:false, // 让ajax不要进行数据的处理，因为Formdata已经处理好了
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 实现预览:为img标签设置Src属性，让浏览器进行解析，发起二次请求
                    $('.thumbnail').attr('src','/uploads/'+res.img).show()
                    // 将图片名称存储到指定的隐藏域中
                    console.log($('[name="feature"]'));
                    console.log(res.img);
                    $('[name="feature"]').val(res.img)
                }else{
                    $('.alert-danger > span').text(res.msg).fadeIn(500).delay(3000).fadeOut(500)
                }
            }
        })
    })

    // 动态加载分类数据
    $.ajax({
        type:'get',
        url:'/getAllCate',
        dataType:'json',
        success:function(res){
            // console.log(res)
            // 生成分类下拉列表动态结构
            var str = '<option value="all">所有分类</option>'
            for(var i = 0; i< res.data.length;i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('#category').html(str)
        }
    })

    // 创建富文本框对象
    CKEDITOR.replace('content')
    // 保存文件
    $('.btnsave').on('click',function(){
        // console.log(CKEDITOR.instances.content.getData())
        // 同步数据到textarea
        CKEDITOR.instances.content.updateElement()
        var data = $('form').serialize()
        // console.log(data)
        $.ajax({
            type:'post',
            url:'/addPost',
            data:data,
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    alert('添加文章成功')
                    // 跳转
                    location.href = '/admin/posts'
                }else{
                    console.log(res.msg)
                }
            }
        })
    })

})