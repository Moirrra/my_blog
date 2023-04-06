import requests from '@/utils/requests'

export const reqUserRegister = (data) => requests({
  url: 'user/register',
  data,
  method: 'post',
})

export const reqUserLogin = (data) => requests({
  url: 'user/login',
  data,
  method: 'post',
})

export const reqUserInfo = () => requests({
  url: 'user/userinfo',
  method: 'get'
})

export const reqUserInfoByUsername = (username) => requests({
  url: 'user/userinfoByUsername',
  method: 'get',
  params: {
    username
  }
})




// 文章

export const reqArticleList = () => requests({
  url: 'article/articleList',
  method: 'get'
})

export const reqArticleListByUsername = (username) => requests({
  url: 'article/articleListByUsername',
  method: 'get',
  params: {
    username
  }
})

export const reqArticleInfo = (id) => requests({
  url: 'article/articleInfo',
  method: 'get',
  params: {
    id,
  }
})

export const reqAbout = () => requests({
  url: 'article/about',
  method: 'get',
})

export const reqAboutByUsername = (username) => requests({
  url: 'article/aboutByUsername',
  method: 'get',
  params: {
    username
  }
})

export const reqSaveArticle = (data) => requests({
  url: 'article/save',
  data,
  method: 'post',
})

export const reqUpdateArticle = (data) => requests({
  url: 'article/update',
  data,
  method: 'post',
})

export const reqDeleteArticle = (data) => requests({
  url: 'article/delete',
  data,
  method: 'post',
})
