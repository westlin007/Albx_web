const express = require('express');
const router = express.Router();
const pagesController = require('./controllers/pagesController')
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const cateController = require('./controllers/cateController.js')

// 配置路由
// router.get('/admin',(req,res)=>{
//     res.render('admin/index')
// })

// router.get('/admin/categories',(req,res)=>{
//     res.render('admin/categories')
// })

// router.get('/',(req,res)=>{
//     res.render('index')
// })

router.get('/',pagesController.getIndexPage)
        .get('/detail',pagesController.getDetailPage)
        .get('/list',pagesController.getListPage)


        // 管理页面
      .get('/admin',pagesController.getAdminIndexPage)
      .get('/admin/ ',pagesController.getAdminCategoriesPage)
      .get('/admin/comments',pagesController.getAdminCommentsPage)
      .get('/admin/login',pagesController.getAdminLoginPage)
      .get('/admin/nav-menus',pagesController.getAdminNav_menusPage)
      .get('/admin/password-reset',pagesController.getAdminPassword_resetPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)
      .get('/admin/post-add',pagesController.getAdminPost_addPage)
      .get('/admin/profile',pagesController.getAdminProfilePage)
      .get('/admin/settings',pagesController.getAdminSettingsPage)
      .get('/admin/slides',pagesController.getAdminSlidesPage)
      .get('/admin/users',pagesController.getAdminUsersPage)
      .get('/admin/posts',pagesController.getAdminPostsPage)
      
      // 业务处理路由
      .post('/login',userController.login)
      .get('/getAllPost',postController.getAllPost)
      .get('/getAllCate',cateController.getAllCate)



// 暴露
module.exports = router