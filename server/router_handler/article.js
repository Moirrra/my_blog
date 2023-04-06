// 导入数据库模块
const db = require('../db.js');

// 导入生成Token的包
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getArticleList = async (req, res) => {
  const tokenData = jwt.decode(req.headers.token.slice(7))
  try {
    const articles = await db.Article.find({ username: tokenData.username })
    res.send({
      status: 0,
      message: '成功获取文章列表',
      data: articles,
    })
    // console.log('成功获取文章列表')
  } catch (error) {
    // console.log('获取文章列表失败！', error)
    res.cc(error)
  }
}

exports.getArticleListByUsername = async (req, res) => {
  const username = req.query.username
  try {
    const articles = await db.Article.find({ username: username })
    res.send({
      status: 0,
      message: '成功获取文章列表',
      data: articles,
    })
    // console.log('成功获取文章列表')
  } catch (error) {
    // console.log('获取文章列表失败！', error)
    res.cc(error)
  }
}

exports.getArticleInfo = async (req, res) => {
  try {
    const article = await db.Article.findOne({ _id: req.query.id })
    res.send({
      status: 0,
      message: '获取文章信息成功!',
      data: article,
    })
  } catch (error) {
    // console.log('获取文章信息失败！', error)
    res.cc(error)
  }
}

exports.getAbout = async (req, res) => {
  const tokenData = jwt.decode(req.headers.token.slice(7))
  try {
    const article = await db.Article.findOne({ username: tokenData.username, title: 'About' })
    if (article) {
      res.send({
        status: 0,
        message: '获取关于信息成功!',
        data: article,
      })
    } else {
      res.cc('获取关于信息失败！')
    }
  } catch (error) {
    // console.log('获取关于信息失败！', error)
    res.cc(error)
  }
}

exports.getAboutByUsername = async (req, res) => {
  console.log('getAboutByUsername')
  const username = req.query.username
  try {
    const article = await db.Article.findOne({ username: username, title: 'About' })
    if (article) {
      res.send({
        status: 0,
        message: '获取关于信息成功!',
        data: article,
      })
    } else {
      res.cc('获取关于信息失败！')
    }
  } catch (error) {
    // console.log('获取关于信息失败！', error)
    res.cc(error)
  }
}

// 保存文章
exports.saveArticle = async (req, res) => {
  const tokenData = jwt.decode(req.headers.token.slice(7))
  const articleInfo = req.body
  try {
    db.Article.create({
      username: tokenData.username,
      title: articleInfo.title,
      date: articleInfo.date,
      content: articleInfo.content,
      summary: articleInfo.summary,
      labels: articleInfo.labels,
    })
    console.log('保存文章成功！')
    res.send({
      status: 0,
      message: '保存文章成功!',
    })
  } catch (error) {
    // console.log('保存文章失败！', error)
    res.cc(error)
  }
}

// 更新文章
exports.updateArticle = async (req, res) => {
  const articleInfo = req.body
  try {
    await db.Article.updateOne({ _id: articleInfo.id },
      { title: articleInfo.title, date: articleInfo.date, content: articleInfo.content, summary: articleInfo.summary, labels: articleInfo.labels })
    res.send({
      status: 0,
      message: '更新文章成功!',
    })
  } catch (error) {
    // console.log('更新文章失败！', error)
    res.cc(error)
  }
}

// 删除文章
exports.deleteArticle = async (req, res) => {
  const id = req.body.id
  console.log(req.body)
  try {
    await db.Article.deleteOne({ _id: id})
    res.send({
      status: 0,
      message: '删除文章成功!',
    })
    // console.log('删除文章成功!')
  } catch (error) {
    // console.log('删除文章失败！', error)
    res.cc(error)
  }
}
