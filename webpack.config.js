const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // JS/JSX 바벨 로더
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // css 로더
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // 템플릿 파일 경로
            filename: 'index.html',
            meta: { charset: 'UTF-8' }
        }),
        new Dotenv({
            path: path.resolve(__dirname, '.env.local'), // 경로 명시
        }),
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/page'),
            '@layout': path.resolve(__dirname, 'src/components/layout'),
            '@utils': path.resolve(__dirname, 'src/util'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        },
        extensions: ['.js', '.jsx']
    }
};