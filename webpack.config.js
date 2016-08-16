var webpack = require('webpack');

module.exports = {
    entry: {
        index:['./app/main.jsx'],
        vendor:['react','react-dom']
    },
    output: {
        path:'./public/javascripts/',
        filename: '[name].js'
    },
    module: {
        loaders:[
            { 
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets: ['react','es2015','stage-2']
                }
            }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};

