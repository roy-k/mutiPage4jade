var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var baseWebpackConfig = require('./webpack.common');

// var DashboardPlugin = require('webpack-dashboard/plugin');

const {htmlPluginArr} = require('./pages')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'sourceMap',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash:6].js',
        publicPath: '/',
        chunkFilename: "static/js/[name].[hash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.css|styl$/,
                use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"]
            },
            // {
            //     test: /\.css|styl$/,
            //     // use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"],
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: [{
            //             loader: 'css-loader',
            //             options: {
            //                 minimize: true //css压缩
            //             }
            //         }, 'postcss-loader', 'stylus-loader'],
            //     })
            // },
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),

        hot: true,
        // 开启服务器的模块热替换（HMR）

        host: 'localhost',

        port: 3008,

        inline: true,
        quiet: true,

        publicPath: '/',
        // 和上文output的"publicPath"值保持一致

        historyApiFallback: true
    },

    plugins: [

        // new DashboardPlugin({ port: 3008 }),

        ...htmlPluginArr.map(({filename, template, chunks}) => {
            return new HtmlWebpackPlugin({filename, template, chunks})
        }),

        new ExtractTextPlugin('static/css/[hash:6].min.css'),

        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）

        new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息

        new FriendlyErrorsPlugin()
    ]
});