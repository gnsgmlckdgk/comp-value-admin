const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



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
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            // 필요한 Node.js 코어 모듈 폴리필 (브라우저에서 동작 가능한 모듈로)
            zlib: require.resolve('browserify-zlib'),
            crypto: require.resolve('crypto-browserify'),
            vm: require.resolve('vm-browserify'),
            os: require.resolve('os-browserify/browser'),
            https: require.resolve('https-browserify'),
            http: require.resolve('stream-http'),
            querystring: require.resolve('querystring-es3'),
            // 사용하지 않는 모듈은 false로 설정
            fs: false,
            child_process: false,
            module: false,
            worker_threads: false,
            // path는 Node.js의 path 기능을 브라우저에서 사용할 경우
            // path-browserify를 사용할 수 있습니다.
            path: require.resolve('path-browserify')
        }
    }
};