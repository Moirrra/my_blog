// 定义验证规则的包
const joi = require('joi');

// 验证规则 required()必填项
const username = joi.string().alphanum().min(1).max(12).required();
const password = joi.string().pattern(/^[\S]{6,20}$/).required();
const avatar = joi.string().dataUri().required();

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
      username,
      password,
  },
};

// 定义更新用户信息的规则对象
exports.update_password_schema = {
  body: {
      oldPwd: password,
      newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  }
}

// 定义更新头像的规则对象
exports.update_avatar_schema = {
  body: {
      avatar,
  },
}
