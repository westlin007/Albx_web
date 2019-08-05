const express = require('express');
const app = express();
// fs = require('fs');
const bodyParser = require('body-parser')
const session = require('express-session')
const router =  require('./router')
app.listen(8080,() => {
    console.log('http://127.0.0.1:8080');
});
//开启session
app.use(session({
    // 加密 加盐
    secret: 'my_albx',//相当于一个加密密钥，值可以是任意字符串
    resave: false,//强制session保存到session store中,不管Session有没有更新，都强制保存
    saveUninitialiazed: false //强制没有‘初始化’的session保存到storage中
}))
// 配置body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
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


// 添加全局的中间件，每次请求都会经过这个中间件
app.use(function (req, res, next) {
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
        next()
    } else {
        // redirect:重定向
       res.redirect('/admin/login')
    } 
})
app.use(router)