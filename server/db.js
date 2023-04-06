const mongoose = require('mongoose')
// 消除严格模式
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://localhost:27017/blog')

const conn = mongoose.connection

conn.on("open", () => {
  console.log('连接数据库成功！')
})

conn.on("error", (err) => {
  console.log('连接数据库失败！')
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String
})

const articleSchema = new mongoose.Schema({
  username: String,
  title: String,
  date: String,
  content: String,
  summary: String,
  labels: Array
})

const User = mongoose.model("User", userSchema)
const Article = mongoose.model("Article", articleSchema)
const Models = {
  User,
  Article
}

module.exports = Models