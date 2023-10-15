const path = require('path');
const fs = require('fs');
const viteBasicSslPlugin = require('@vitejs/plugin-basic-ssl');

module.exports = {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "D://SSL证书//gaoyubo.cn_nginx//gaoyubo.cn_nginx//gaoyubo.cn.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "D://SSL证书//gaoyubo.cn_nginx//gaoyubo.cn_nginx//gaoyubo.cn_bundle.crt")),
    },
  },
  plugins: [viteBasicSslPlugin()],
};
