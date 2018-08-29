const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',

    resolve(__dirname, 'src/index.js'),
  ],

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'wwwroot'),
    publicPath: '/',
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,

    contentBase: [
      resolve(__dirname, 'wwwroot'),
      resolve(__dirname, 'src/assets'),
    ],

    compress: true,
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: [/node_modules/, /assets/],
        options: {
          plugins: [['import', {libraryName: 'antd', libraryDirectory: 'es'}]],
        },
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader?limit=1024&name=fonts/[name].[ext]',
        },
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'less-loader',
            options: {javascriptEnabled: true},
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.(ico)$/,
        use: {
          loader: 'url-loader?limit=1024&name=assets/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)(\?.*)?$/,
        use: {
          loader: 'url-loader?limit=25000&name=assets/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  resolve: {
    extensions: ['.js'],
  },
}
