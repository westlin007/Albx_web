const express = require('express');
const app = express();
// fs = require('fs');
const router = require('./router')
app.listen(8080,() => {
    console.log('http://127.0.0.1:8080');
});
// 静态资源
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

// app.get('/',(req,res) => {
//     fs.readFile('./views/index.html',(err,data) => {
//         if(err) console.log(err);
//         res.end(data)
//     })
// });

// 设置ejs模板引擎
app.set('view engine','ejs');

// 在引用ejs模板引擎的情况下 默认html后缀 同时也可以开启ejs后缀文件
// app.engine('.html', require('ejs').__express);
// app.set('view engine', 'html');

app.set('views',__dirname+'/views');
// 主页
// app.get('/',(req,res) => {
//     res.render('index')
// })
// // admin主页
// app.get('/admin',(req,res) => {
//     res.render('admin/index.ejs')
// })

app.use(router)