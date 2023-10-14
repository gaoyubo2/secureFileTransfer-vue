const webpack = require('api')
module.exports = {
  devServer: {
    proxy: {
      //名字可以自定义，这里我用的是api
      '/api': {
        target: 'https://gaoyubo2',//设置你调用的接口域名和端口号（目标IP：端口）
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
