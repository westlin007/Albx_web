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
                    join categories on posts.category_id = categories.id
                    where 2=2 ` // 添加恒成立
            if( obj.cate && obj.cate != 'all'){  // 判断有没有传递分类数据
                sql += ` and category_id = ${obj.cate}`
            }
            if(obj.status && obj.status != 'all'){
                sql += ` and posts.status ='${obj.status}'`
            }

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

// 文章新增
exports.addPost = (obj,callback) => {
    let sql =  `insert into posts set ?`
    conn.query(sql,obj,(err,results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

// 根据id获取文章详细数据
exports.getPostById = (id,callback) => {
    var sql = 'select * from posts where id = ' + id
    conn.query(sql,(err,results) => {
        if (err) {
            callback(err)
        } else {
            callback(null, results[0])
        }
    })
}

// 根据文章id实现文章的编辑
exports.editPostById = (obj,callback) => {
    let sql = 'update posts set ? where id = ?'
    conn.query(sql,[obj,obj.id],(err,results) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

// 根据文章id实现文章的删除
exports.delPostById = (id,callback) =>{
    let sql = 'delete from posts where id = ?'
    conn.query(sql,[id],(err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}