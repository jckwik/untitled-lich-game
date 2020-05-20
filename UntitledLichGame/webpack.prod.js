/// <binding />
const merge = require('webpack-merge');
const common = require('./webpack.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Untitled Lich Clicker',
            template: 'index.html'
        })
    ]
});