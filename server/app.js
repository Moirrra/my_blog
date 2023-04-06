// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi = require('joi')

// 配置cors跨域
// 导入 cors 中间件
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置解析表单数据的中间件和路由
app.use(express.urlencoded({ extended: false }))


// 封装回复带有状态消息的中间件 默认失败
app.use((req, res, next) => {
  // status默认值为1，表示失败
  // err可能是一个错误对象，也可能是一个字符串
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})


// 在路由前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT.expressjwt({ secret: config.jwtScretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api/] }))

const history = require('connect-history-api-fallback')
app.use(history())

/* 导入并使用路由模块 */
const userRouter = require('./router/user')
const articleRouter = require('./router/article')
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)


// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})


app.listen(8888, function () {
  console.log('server is running at http://127.0.0.1:8888')
})