const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const webpack=require('webpack');
module.exports = {
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", '.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Know Your Neighborhood',
            filename: path.join(__dirname, 'dist/index.html')
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom',
            'Reactstrap': 'reactstrap',
        }),
        new HtmlWebpackRootPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            { test: /\.ts(x?)$/, exclude: /node_modules/, use: "ts-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
            { test:/\.(s*)css$/, use:['style-loader','css-loader', 'sass-loader'] },
            { test: /\.png$/, use: 'url-loader?mimetype=image/png' },
            { test: /\.gif$/, use: 'url-loader?mimetype=image/gif' }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    "output": {
        path: path.join(__dirname, 'dist/assets'),
        publicPath: '/dist/assets',
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
    }
};