
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {

    mode: 'development',
    devtool: 'eval-source-map',
    module: {

        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {

        port: 5173,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
});
