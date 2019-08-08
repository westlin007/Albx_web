const conn = require('../utils/myconn.js')

exports.getAllPost = (obj,callback) => {
    let sql = `select posts.*,users.nickname,categories.name
                from posts
                join users on posts.user_id = users.id
                join categories on posts.category_id = categories.id
                where 1=1 ` // 添加恒成立
    if( obj.cate && obj.cate != 'all'){  // 判断有没有传递分类数据
        sql += ` and category_id = ${obj.cate}`
    }
    if(obj.status && obj.status != 'all'){
        sql += ` and posts.status ='${obj.status}'`
    }

    sql += ` order by id desc
            limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize}`
    
    conn.query(sql,(err,result) => {
        if(err){
            callback(err)
        }else{
            sql = `select count(*) as cnt
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id`
            conn.query(sql,(err2,res2) => {
                if(err2){
                    callback(err2)
                }else{
                    // console.log(res2);
                    callback(null,{data:result,total:res2[0].cnt})
                }    
            })
        }
    })
}   