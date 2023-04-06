const uuid = require('uuid')

// 生成一个随机字符串，每次执行不变，持久化存储
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUID_TOKEN')
  if (!uuid_token) {
    uuid_token = uuid.v4()
    localStorage.setItem('UUID_TOKEN', uuid_token)
  }
  return uuid_token
}