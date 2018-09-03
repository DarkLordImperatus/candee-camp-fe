const {resolve} = require('path')
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
/* eslint-enable import/no-extraneous-dependencies */

module.exports = {
  entry: [resolve(__dirname, 'src/index.js')],

  output: {
    filename: '[name]-[hash].js',
    path: resolve(__dirname, 'wwwroot'),
    publicPath: '/',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['vendor', 'manifest'],
    }),

    new HtmlWebpackPlugin({
      template: 'src/assets/index.tpl.prod.html',
      inject: 'body',
      filename: 'index.html',
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin('[name]-[hash].min.css'),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,

      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  resolve: {
    extensions: ['.js'],
  },
}
