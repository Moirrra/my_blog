import Vue from 'vue'
import Vuex from 'vuex'
import { getUUID } from '@/utils/uuid_token'
import { setToken, getToken, removeToken } from '@/utils/token'
import { reqUserRegister, reqUserLogin, reqUserInfo, reqUserInfoByUsername, } from '@/api'

Vue.use(Vuex)

const state = {
  // 游客临时身份
  uuid_token: getUUID(),
  token: getToken(),
  username: '',
  avatar: '',
}

const getters = {
}

const actions = {
  // 用户注册
  async userRegister({ commit }, userInfo) {
    console.log('userRegister:' + userInfo.username)
    let result = await reqUserRegister(userInfo)
    console.log(result)
    if (result.status == 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败！'))
    }
  },
  // 用户登录
  async userLogin({ commit }, userInfo) {
    console.log('userLogin:' + userInfo.username)
    let result = await reqUserLogin(userInfo)
    if (result.status == 0) {
      commit('USER_LOGIN', result.token)
      setToken(result.token)
      return 0
    } else {
      return 1
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    console.log('getUserInfo')
    let result = await reqUserInfo()
    if (result.status == 0) {
      commit('GET_USER_INFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户信息失败！'))
    }
  },
  // 根据用户名获取用户信息
  async getUserInfoByUsername({ commit }) {
    console.log('getUserInfoByUsername')
    let result = await reqUserInfoByUsername()
    if (result.status == 0) {
      commit('GET_USER_INFO_BY_USERNAME', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户信息失败！'))
    }
  },
  // 退出登录
  userLogout({ commit }) {
    commit('CLEAR')
  },
}

const mutations = {
  USER_LOGIN(state, token) {
    state.token = token
  },
  GET_USER_INFO(state, userInfo) {
    state.username = userInfo.username
    state.avatar = userInfo.avatar
  },
  GET_USER_INFO_BY_USERNAME(state, userInfo) {
    state.username = userInfo.username
    state.avatar = userInfo.avatar
  },
  // 清除本地用户数据
  CLEAR(state) {
    state.token = ''
    state.username = ''
    removeToken()
  },
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

