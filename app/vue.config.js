const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    proxy: {
      // 前端发送请求时，路径带有/api，代理服务器则会工作
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
