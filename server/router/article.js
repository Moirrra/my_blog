const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const article_handler = require('../router_handler/article')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { article_schema } = require('../schema/article')

// 获取所有文章
router.get('/articleList', article_handler.getArticleList)
router.get('/articleListByUsername', article_handler.getArticleListByUsername)

// 获取文章信息
router.get('/articleInfo', article_handler.getArticleInfo)

// 获取关于信息
router.get('/about', article_handler.getAbout)
router.get('/aboutByUsername', article_handler.getAboutByUsername)

// 添加文章
router.post('/save', article_handler.saveArticle)

// 更新文章
router.post('/update', article_handler.updateArticle)

// 删除文章
router.post('/delete', article_handler.deleteArticle)


module.exports = router