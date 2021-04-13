/*
 * @Author: your name
 * @Date: 2021-04-12 11:25:46
 * @LastEditTime: 2021-04-13 15:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\vue.config.js
 */
'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',//部署应用包时的基本 URL
  outputDir: 'dist',//生成的生产环境构建文件的目录
  assetsDir: 'static',//放置生成的静态资源目录
  lintOnSave: process.env.NODE_ENV === 'development',//是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  productionSourceMap: false,//设置为 false 以加速生产环境构建
  devServer: {
    port: 8088,//指定端口号
    host:"0.0.0.0",//指定要使用的主机。如果您希望服务器可以从外部访问，请按以0.0.0.0方式指定它
    open: true,//告诉dev-server在服务器启动后打开浏览器。将其设置true为打开默认浏览器
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
