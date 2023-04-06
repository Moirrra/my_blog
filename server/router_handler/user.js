// 导入数据库模块
const db = require('../db.js');
// 导入密码加密模块
const bcrypt = require('bcryptjs');
// 导入生成Token的包
const jwt = require('jsonwebtoken');
const config = require('../config');

// 注册 处理函数
exports.regUser = async (req, res) => {
  const userInfo = req.body
  // 合法性验证
  if (!userInfo.username || !userInfo.password) {
    return res.cc('用户名或密码不存在！')
  }

  userInfo.password = bcrypt.hashSync(userInfo.password, 10)
  try {
    const user = await db.User.findOne({ username: userInfo.username })
    if (!user) {
      db.User.create({ username: userInfo.username, password: userInfo.password, avatar: '' })
      // console.log('注册成功！')
      res.cc('注册成功！', 0)
    } else {
      // console.log('用户已存在！')
      res.cc('用户已存在！')
    }
  } catch (err) {
    // console.log('注册失败！', err)
    res.cc(err)
  }
}

// 登录 处理函数
exports.login = async (req, res) => {
  const userInfo = req.body
  try {
    const user = await db.User.findOne({ username: userInfo.username })
    if (user) {
      const compareResult = bcrypt.compareSync(userInfo.password, user.password)
      if (!compareResult) {
        // console.log('登录失败！')
        res.cc('登录失败！')
      } else {
        // console.log('登录成功！')
        // 在服务器端生成Token字符串
        const userStr = { username: user.username, password: '', avatar: '' }
        const tokenStr = jwt.sign(userStr, config.jwtScretKey, { expiresIn: config.expiresIn })
        res.send({
          status: 0,
          message: '登录成功！',
          token: 'Bearer ' + tokenStr
        })
      }
    } else {
      // console.log('登录失败！', err)
      res.cc('登录失败！')
    }
  } catch (err) {
    // console.log('登录失败！', err)
    res.cc(err)
  }
}

// 获取用户信息 处理函数
exports.getUserinfo = async (req, res) => {
  try {
    const tokenData = jwt.decode(req.headers.token.slice(7))
    const user = await db.User.findOne({ username: tokenData.username })
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: {
        username: user.username,
        avatar: user.avatar,
      }
    })
    // console.log('获取用户信息成功！')
  } catch (err) {
    // console.log('获取用户信息失败！', err)
    res.cc(err)
  }
}

exports.getUserinfoByUsername = async (req, res) => {
  if (req.query.username) {
    const username = req.query.username
    try {
      const user = await db.User.findOne({ username: username })
      res.send({
        status: 0,
        message: '获取用户信息成功！',
        data: {
          username: user.username,
          avatar: user.avatar,
        }
      })
      console.log('获取用户信息成功！')
    } catch (err) {
      console.log('获取用户信息失败！', err)
      res.cc(err)
    }
  } else {
    res.cc('获取用户信息失败！')
  }
}

exports.checkUser = async (req, res) => {
  const username = req.query.username
  const tokenData = jwt.decode(req.headers.token.slice(7))
  console.log(username + ' ' + tokenData.username)
  if (username === tokenData.username) {
    console.log('check 1')
    res.send({
      status: 0,
      message: '用户信息匹配！',
    })
  } else {
    console.log('check 0')
    res.cc('用户信息不匹配！')
  }
}