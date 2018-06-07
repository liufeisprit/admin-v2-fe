const path=require('path')
const webpack=require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    entry:'./src/app.jsx',//入口文件
    //输出配置
    output:{
            path:path.resolve(__dirname,'dist'),
            filename:'js/app.js',
            publicPath: '/dist/',
    },
    // devServer: {
    //         contentBase: './dist'
    // },
    module: {
        rules: [
            //处理jsx文件的
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            //处理 css文件的
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, 
            //处理sass 文件的 需要安装node-sass
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //字体图片的配置
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [  
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'resource/[name].[ext]'
                        }
                    }                  
                   
                    ]
            }
        ]
    },
    plugins: [
        //处理html插件的 
             new HtmlWebpackPlugin({
             title: 'Output Management',
             template:'./src/index.html'
            }),
        //把css都提取出来 styles.css 会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。
            new ExtractTextPlugin("css/[name].css"),
            // new CleanWebpackPlugin(['dist']),
            new webpack.optimize.CommonsChunkPlugin({
                name:'common',
                filename:'js/base.js'
            })
    ],
}