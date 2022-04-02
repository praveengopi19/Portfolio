const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('../node_modules/@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    // liveReload: true,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        }],
      },
      {
        test: /\.(css)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff2|woff|tff)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/media',
          outputPath: 'media',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ],
  },
  plugins: [new ReactRefreshPlugin()],

});
