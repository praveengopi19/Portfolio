const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const OptimiseCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const common = require('./webpack.common')
const { javascript } = require('webpack')


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name]-[contentHash].js',
        chunkFilename: 'js/[name]-[contentHash:8].chunk.js',
        publicPath: '/',
        path: path.resolve(__dirname, '../build')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contentHash].css',
            chunkFilename: 'styles/[name]-[contentHash:8].chunk.css'
        }),
        //  new CompressionPlugin({
        //     filename: '[path][base].gz',
        //     algorithm: 'gzip',
        //     test: /\.(js|css|html)$/,
        //     threshold: 9216,
        //     minRatio: 0.8
        // })
        new CompressionPlugin({
            // filename(pathData) {
            //     // The `pathData` argument contains all placeholders - `path`/`name`/`ext`/etc
            //     // Available properties described above, for the `String` notation
            //     if (/\.css$/.test(pathData.file)) {
            //         return "[path][base].gz";
            //     }


            //     return "[path][base].gz";
            // },
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(js|css|html)$/,
            threshold: 9216,
            minRatio: 0.8
        })
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js/,
                exclude: [/node_modules/, /\.(sw.js)$/],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|woff2|woff|tff)$/,
                loader: 'file-loader',
                // options: {
                //     outputPath: 'media',
                //     filename: '[name].[ext]'
                // }
                options: {
                    outputPath: 'media',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                use: [{ loader: '@svgr/webpack' }, {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media',
                        name: '[name].[ext]'
                    }
                }
                ],
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new OptimiseCssAssetsPlugin(), new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: {
                condition: /^\**!|@preserve|@license|@cc_on/i,
                filename: (file) => {
                    return file.replace(/\.(\w+)($|\?)/, '.$1.LICENSE.txt$2');
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
})