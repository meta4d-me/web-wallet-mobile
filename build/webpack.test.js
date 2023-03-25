const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const ManifestPlugin = require('webpack-manifest-plugin');
const envConfig = require('../config/env.conf');
const BuildENV = envConfig.getBuildENV({ NODE_ENV: '"production"', prod: '"test"' });

module.exports = (RESETENV) => {
  /**定义设置**/
  let BuildConfig = {
    /**打包应用模式**/
    target: 'web',
    /**打包模式**/
    mode: 'production',
    /**devTools开启标识**/
    //devtool:'source-map',//开启将会生成map文件
    output: {
      path: path.resolve(__dirname, '../dist/'+BuildENV.dist),
      publicPath: BuildENV.staticURL,
    },
    plugins: [
      /**定义APP常量**/
      new HtmlWebpackPlugin({
        template: './'+BuildENV.sysName+'/'+BuildENV.filename,
        filename: 'index.html', //输出的文件名
        title: BuildENV.title,
        inject: true,
        timeStamp: new Date().valueOf(),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        vConsole: true,
        prod: true,
        staticURL: BuildENV.staticURL,
        webURL: BuildENV.webURL,
      }),
      new webpack.DefinePlugin({
        /**自定义当前系统变量**/
        'process.env': envConfig.getNodeENV({ NODE_ENV: '"production"', prod: '"test"' }),
        /**默认系统变量**/
        'process.env.NODE_ENV': BuildENV.NODE_ENV,
      }),
      /**提取CSS**/
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].style.[chunkhash].css', // 打包生成的样式文件名称
        chunkFilename: 'assets/css/[name].[chunkhash].css',// 打包生成的样式文件名称
      }),
      /**打包进度条**/
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        handler(percentage, message, ...args) {
          console.info(
            `\u001b[A\u001b[K\u001b[33m${(percentage * 100).toFixed(2)}%`+
            `\t\u001b[0m\u001b[1m${message}\t`+
            `\u001b[0m\u001b[90m${args && args.length>0?args[0]:''}\u001b[0m`,
          );
        },
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null,
      }),
      /**清空dist文件夹**/
      new CleanWebpackPlugin(),
    ],
    /**组件**/
    module: {
      rules: [{
        //解析器的执行顺序是从下往上(先css-loader再style-loader)
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                auto: false,//modules 开关,移动端多页面模式关闭class hash命名
                localIdentName: '[local]_[hash:base64:8]',// 自定义生成的类名
              },
            },
          }],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'],
      }],
    },
    optimization: {
      minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
      minimizer: [new TerserPlugin({
        parallel: true, // 可省略，多线程，默认开启并行
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          ecma: 5, // specify one of: 5, 2015, 2016, etc.这一句开启，其他设置ecma选项无效
          parse: {
            'html5_comments': false,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            'drop_debugger': true,
          },
          mangle: {
            safari10: true, // 传递true以解决 Safari 10 循环迭代器错误 “不能两次声明 let 变量”
          },
          output: {
            ecma: 5,
            comments: false,
            'ascii_only': true,
            'inline_script': false,
          },
          ie8: true,
          safari10: true,
        },
        extractComments: false, // 是否提取注释，并将其放置在一个独立文件之中
      }),
      new CssMinimizerPlugin(),//压缩css
        // eslint-disable-next-line array-bracket-newline
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };

  if (BuildENV && BuildENV.analyzer) {
    BuildConfig.plugins.push(new BundleAnalyzerPlugin()); //打包体积分析
    //BuildConfig.plugins.push(new ManifestPlugin());  //展示源代码和打包代码映射关系
  }

  return merge(common(RESETENV), BuildConfig); //合并配置
};
