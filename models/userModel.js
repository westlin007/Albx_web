const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'albx'
})

exports.login = (email,callback) => {
    let sql = `select * from users where email = "${email}"`

    conn.query(sql,(err,result) => {
        if (err) {
            callback(err)
        }else{
            callback(null,result[0])
        }
    })
}