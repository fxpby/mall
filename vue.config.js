module.exports = {
  configureWebpack:{
    resolve: {
      // extensions: [],
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
  // ,
  //   pwa: {
  //   iconPaths: {
  //     favicon32     : 'favicon.ico',
  //     favicon16     : 'favicon.ico',
  //     appleTouchIcon: 'favicon.ico',
  //     maskIcon      : 'favicon.ico',
  //     msTileImage   : 'favicon.ico'
  //   }
  // }
}