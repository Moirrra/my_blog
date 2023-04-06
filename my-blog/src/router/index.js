import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);

import routes from './routes'
import store from '@/store'

/* 重写push和replace */
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

// 配置路由
let router = new VueRouter({
  mode: 'history',
  routes,
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.token
  let username = store.state.username
  console.log('from:' + from.path + ' to:' + to.path)
  console.log('token:' + token)
  console.log('username:' + username)
  // 用户已登录
  if (token) {
    if (username) {
      next()
      if (to.path.indexOf('/edit') !== -1 || to.path.indexOf('/manage') !== -1) {
        if (to.params.username === username) { // 当前用户为博客主
          console.log('yes')
          next()
        } else {
          console.log('no')
          next(from.path)
        }
      } else next()
    } else { // 已登录未获取用户信息
      try {
        await store.dispatch('getUserInfo')
        if (to.path.indexOf('/edit') !== -1 || to.path.indexOf('/manage') !== -1) {
          if (to.params.username === username) { // 当前用户为博客主
            console.log('yes')
            next()
          } else {
            console.log('no')
            next(from.path)
          }
        } else next()
      } catch (err) { // token失效 重新登录
        // 清除token
        await store.dispatch('userLogout')
        next('/login')
      }
    }
  } else {
    if (to.path.indexOf('/edit') !== -1 || to.path.indexOf('/manage') !== -1) {
      next('/login')
    } else next()
  }
})

export default router
