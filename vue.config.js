const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  // 第一种方式
  outputDir: './bundle',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 第二种方式
  configureWebpack: {
    //   resolve: {
    //     alias: {
    //       components: path.resolve(__dirname, '@/components')
    //     }
    //   }
    // rules: {
    //   loader: [
    //     {
    //       test: /\.css$/,
    //       use: ['style-loader', 'css-loader']
    //     }
    //   ]
    // },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // 第三种方式
  chainWebpack: config => {
    // console.log(config);
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', path.resolve(__dirname, 'src/components'));
    // config.resolve.extensions
    // config.module
    //   .rule('css')
    //   .test(/\.css$/)
    //   .use('css-loader')
    //     .loader('css-loader')
    //     .end()
    //   .use('style-loader')
    //     .loader('style-loader')
    //     .end()
  },
};
