const path = require('path');

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
    resolve: {
        extensions: ['.js', '.jsx']
    }
};