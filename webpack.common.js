
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
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/renderer/index.html'),
        }),
    ],
};
