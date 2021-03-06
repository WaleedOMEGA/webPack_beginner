const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
watch: true,
plugins: [
    new MiniCssExtractPlugin({
    filename: 'application.css'
    })
    ],
mode: "development",
devtool: "source-map",
entry: "./src/index.js",
output: {
filename: "application.js",
path: path.resolve(__dirname, 'build')
},
    module:{
        rules: [
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env']
            }
            }
            },{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
                },
                {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                    {
                    loader: 'url-loader',
                    options: {
                    limit: 8192,
                    name: '[name].[hash:7].[ext]'
                    },
                    },
                    { loader: 'image-webpack-loader' }
                    ],
                    }

            ]
    },
    optimization: {
        minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
        ],
        }
    }