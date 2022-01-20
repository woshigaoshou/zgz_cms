const path = require('path');

module.exports = {
  // 第一种方式
  outputDir: './bundle',
  // 第二种方式
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: path.resolve(__dirname, '@/components')
  //     }
  //   }
  // },
  // 第三种方式
  chainWebpack: config => {
    console.log(config);
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', path.resolve(__dirname, 'src/components'));
    // config.resolve.extensions
  },
};
