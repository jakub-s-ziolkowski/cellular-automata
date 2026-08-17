
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: path.resolve(__dirname, 'src/renderer/index.tsx'),
    experiments: {

        asyncWebAssembly: true,
    },
    resolve: {

        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
        },
        alias: {
            '@components': path.resolve(__dirname, 'src/renderer/components'),
            '@utils': path.resolve(__dirname, 'src/renderer/utils'),
            '@assets': path.resolve(__dirname, 'src/renderer/assets'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [ '@svgr/webpack' ],
            }
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/renderer/index.html'),
        }),
    ],
};
