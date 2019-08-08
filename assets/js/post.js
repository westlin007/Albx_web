$(function(){
    // 定义全局的页码和页数量
    var pageNum = 1
    var pageSize = 5
     
    function init(search){
        $.ajax({
            url:'/getAllPost',
            type:'get',
            data:{
                pageNum:pageNum,
                pageSize:pageSize,
                ...search
            },
            success:function(result){
                console.log(result);
                let html = template('postListTemp',result.data)
                $('tbody').html(html);
                //生成分页结构
                setPagenation(Math.ceil(result.data.total / pageSize))
            }
        })
    }
    init()

    // 分页功能
    function setPagenation(total){
        // 初始化
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:pageNum, // 当前页
            totalPages:total, // 总页数
            onPageClicked:function(event,originalEvent,type,page){
                pageNum = page
                init()
            }
        })
    }

    // 加载分类数据
    $.ajax({
        type:'get',
        url:'/getAllCate',
        dataType:'json',
        success:function(res){
            console.log(res)
            var str = '<option value="all">所有分类</option>'
            for(var i = 0; i< res.data.length;i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('.cateSelector').html(str)
        }
    })

    // 实现筛选功能
    $('.btn-search').on('click',function(){
        // 收集数据
        var obj = {
            cate:$('.cateSelector').val(),
            status:$('.statuSelector').val()
        }
        console.log(obj)
        // 发起ajax请求
        init(obj)
    })
})