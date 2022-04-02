const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const toBeCopied = ['../public/pwa icons', '../public/manifest.json', '../public/offline.html', '../public/pk.svg', '../public/ogcmd.png'];

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /(sw.js)$/,
        use: [{
          loader: 'worker-loader',
          options: {
            publicPath: '/',
            filename: 'sw.js',
          },
        },
        {
          loader: 'babel-loader',
        },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: toBeCopied.map((pathOfAsset) => ({ from: path.resolve(__dirname, pathOfAsset).replace(/\\/g, '/') })),

    }),
  ],
};
