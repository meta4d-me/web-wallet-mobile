const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ip = require('ip');
const webpack = require('webpack');
const envConfig = require('../config/env.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildENV = envConfig.getBuildENV({ NODE_ENV: '"development"', prod: '"dev"' });

module.exports = (RESETENV) => {
  let DEVConf;
  DEVConf = {
    devtool: 'inline-source-map', //开启source map
    mode: 'development',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      host: BuildENV.host,
      port: BuildENV.port && Number(BuildENV.port),
      proxy: {
        '/aaa': {
          target: 'http://192.168.50.104:8085',
          //target: 'https://baidu.com',
          //secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          pathRewrite: { '^/aaa': '/aaa' },
        },
      },
    },
    module: {
      rules: [{
        //解析器的执行顺序是从下往上(先css-loader再style-loader)
        test: /\.css$/i,
        use: ['style-loader',
          'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        // eslint-disable-next-line array-bracket-newline
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader'],
      },
      {
        test: /\.less$/i,
        // eslint-disable-next-line array-bracket-newline
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'],
      }],
    },
    // eslint-disable-next-line array-bracket-newline
    plugins: [
      /**定义APP常量**/
      new HtmlWebpackPlugin({
        template: './' + BuildENV.sysName + '/' + BuildENV.filename,
        filename: 'index.html', //输出的文件名
        title: BuildENV.title,
        inject: true,
        timeStamp: new Date().valueOf(),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        vConsole: false,
        prod: false,
        staticURL: BuildENV.staticURL,
        webURL: BuildENV.webURL,
      }),
      /**运行成功，输出信息**/
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://${ip.address()}:${BuildENV.port} \r\nYou can also open local address http://localhost:${BuildENV.port}`],
          clearConsole: true,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': envConfig.getNodeENV({ NODE_ENV: '"development"', prod: '"dev"' }),
        //__VUE_OPTIONS_API__: false,//避免控制台警告信息
        //__VUE_PROD_DEVTOOLS__: false
      })],
  };

  return merge(common(RESETENV), DEVConf);
};
