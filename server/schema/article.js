// 定义验证规则的包
const joi = require('joi')

// 验证规则
const username = joi.string().required()
const title = joi.string().required()
const date = joi.string().required()
// allow('') 支持空字符串
const content = joi.string().allow('').required
const summary = joi.string().allow('').required
const labels = joi.array()


exports.article_schema = {
  body: {
    username,
    title,
    date,
    content,
    summary,
    labels,
  }
}

