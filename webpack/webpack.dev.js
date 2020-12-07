var path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, '../dist'),
        stats: {
            colors: true
        },
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
        //host:'0.0.0.0',
        //disableHostCheck:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [require.resolve('react-refresh/babel')]
                    }
                }]
            },
            {
                test: /\.(css)/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|woff2|woff|tff)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/media',
                    outputPath: 'media',
                    filename: '[name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'file-loader'],
            }
        ]
    },
    plugins: [new ReactRefreshPlugin()]

})