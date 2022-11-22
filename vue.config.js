let proxyObj = {};

proxyObj['/'] = {
  //websocket
  ws: false,
  //代理到哪里去
  target: 'http://localhost:18081',
  //发送请求头host会被设置target
  changeOrigin: true,
  //不重写请求地址
  pathWrite: {
    '^/': '/',
  },
};

module.exports = {
  devServer: {
    host: 'localhost',
    port: 18088,
    proxy: proxyObj,
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        content: 'components/content',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
      },
    },
  },
};
