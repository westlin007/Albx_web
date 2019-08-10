const postModel = require('../models/postModel')
const moment = require('moment')

exports.getAllPost = function(req,res){
    let obj  =req.query;
    // console.log(obj);
    postModel.getAllPost(obj,(err,data) => {
        if(err){
            res.json({code:400,msg:'数据查询失败'})
        }else{
            // for(let i=0; i<data.length; i++){
            //     data[i].created = moment(data[i].created).format('YY-MM-DD HH:mm:ss')
            // }
            res.json({
                code:200,
                msg:'数据查询成功',
                data:data,
            })
        }
    })
}

// 文章新增
exports.addPost = (req,res) => {
    // 接收参数
    var obj = req.body
    // 添加数据库所需要的三个字段的数据
    // obj.id = null
    obj.views = 0
    obj.likes = 0
    obj.user_id = req.session.currentUser.id
    // 调用数据模块中的方法
    postModel.addPost(obj,(err) => {
        if(err){
            console.log(err)
            res.json({code:400,msg:'数据新增失败'})
        }else{
            res.json({
                code:200,
                msg:'数据新增成功'
            })
        }
    })
}