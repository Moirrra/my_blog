// 项目在发布时需要用到的 babel 插件数组
const proPlugins = [];
// 如果当前是测试环境或者是生产环境，则使用去掉 console 的插件
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    proPlugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk",

      }
    ],
    ...proPlugins,
    // 'transform-remove-console',
  ],
}
