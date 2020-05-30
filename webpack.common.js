const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: './src/App.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'bin'),
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    resolve: {
        /*alias: {
            Base: path.resolve(__dirname, '../../slot-template/src/'),
            Engine: path.resolve(__dirname, '../../../game-engine/src/')
        },*/
        modules: [
            path.resolve(__dirname, './node_modules/'),
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ]
};
