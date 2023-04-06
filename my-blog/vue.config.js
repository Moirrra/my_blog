module.exports = {
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
}