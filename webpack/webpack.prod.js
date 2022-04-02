const { merge } = require('webpack-merge');
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].chunk.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[contenthash].css',
      chunkFilename: 'styles/[name]-[contenthash:8].chunk.css',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 9216,
      minRatio: 0.8,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js/,
        exclude: [/node_modules/, /\.(sw.js)$/],
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|woff2|woff|tff)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack' }, {
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: '[name].[ext]',
          },
        },
        ],
      },
    ],
  },
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    concatenateModules: false,
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
    splitChunks: {
      minSize: 1,
      maxInitialRequests: 100,
      maxAsyncRequests: 100,
      chunks: 'all',
      name: false,
      // minChunks: 2,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
