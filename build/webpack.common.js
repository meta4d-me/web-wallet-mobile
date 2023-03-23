const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const os = require('os');
const threads = os.cpus().length;

module.exports = () => {
  return {
    context: path.resolve(__dirname, '../'),
    entry: './'+config.build.sysName+'/main.js', //入口文件
    stats: 'errors-only', // 仅错误时显示logo
    externals: {
      'axios': 'axios',
      //'web3': 'web3',
      'ethers': 'ethers',
    },
    output: {
      filename: 'assets/js/[name].[chunkhash].js',
      chunkFilename: 'assets/js/[name].[chunkhash].js', //动态导入 分离bundle 比如lodashjs配合注释import(/* webpackChunkName: "lodash" */ 'lodash') 会打包成lodash.bundle.js
      path: path.resolve(__dirname, '../dist'),
    },
    resolve: {  //配置模块如会解析
      extensions: [
        '.vue','.js','.json', '.css', '.ts', '.mjs', '.less', '.sass','.jsx', '.coffee', '.tsx',
      ], //引入这些文件 可以不带后缀 按顺序解析'.js', '.vue', '.json', '.css'
      alias: {
        '@': path.resolve(__dirname, '../public'),
        '@utils': path.resolve(__dirname, '../public/utils'),
        '@web3': path.resolve(__dirname, '../public/web3'),
        '@App': path.resolve(__dirname, '../demoApp'),
        '@m4m': path.resolve(__dirname, '../m4m'),
      },
      aliasFields: ['browser', 'browser.esm'], /**别名区域**/
      modules: ['node_modules'], /**绝对寻址路径**/
      /**
      fallback: { // webpack5兼容babel的回退，https://webpack.js.org/configuration/resolve/#resolvemainfields
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url')
      }**/
    },
    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
      }, // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // 只做语言转换，而不做类型检查
          },
        }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'thread-loader', // 开启多进程
          options: {
            workers: threads, // 数量
          },
        },
        {
          loader: 'babel-loader',
          options: {
            //comments: false, 这一句打开，不展示chunk名称
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-runtime',
              { corejs: 3 }]],
          },
        }],/**
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },**/
        type: 'javascript/auto',
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 6 * 1024,//小于6kb的图片内联处理
          },
        },
      }],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new VueLoaderPlugin(),
      /**copy根目录的static文件夹到dist下**/
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
        }],
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
      // eslint-disable-next-line array-bracket-newline
    ],
  };
};
