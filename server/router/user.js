const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/register',expressJoi(reg_login_schema), user_handler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

// 获取用户信息
router.get('/userinfo', user_handler.getUserinfo)

router.get('/userinfoByUsername', user_handler.getUserinfoByUsername)

// 验证用户
router.get('/check', user_handler.checkUser)

module.exports = router