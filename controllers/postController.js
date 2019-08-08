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