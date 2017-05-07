/**
 * 项目开发环境配置文件
 */
var path = require('path')
var webpack   = require('webpack')
var	HtmlWebpackPlugin   = require('html-webpack-plugin')
var	autoprefixer      = require('autoprefixer')
var	csswring          = require('csswring')
var	ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry : {
        bundle: ['./src/js/app.js']
    },
    output: {
        path:      './dist',
        filename:  'js/[name].js',
        publicPath: '/',
        chunkFilename: 'chunk/[id].chunk.js',
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            '/lianzi/**': {  //https://lz.lianziapp.com/lianzi/discover/searchOrg
                target: 'https://lz.lianziapp.com',
                secure: false,
                changeOrigin: true
            }
        }
    },
    eslint: {
        configFile: '.eslintrc.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-0'
                    ]
                }
            },

            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url'
            },
            { test: /\.css$/, loader : ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader') }

        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',       //动态生成的html存放路径，相对于 path
            template:'./src/index.html',        //生成的文件来源于
            inject:true,                        //允许插件修改哪些内容，包括head与body
            hash:true,                          //为静态资源生成hash值
            minify:{                            //压缩HTML文件
                removeComments:true,            //移除HTML中的注释
                collapseWhitespace:false,        //删除空白符与换行符
                removeRedundantAttributes:true,  //当值与默认值匹配时删除属性。
                useShortDoctype:true,           //  doctype用短（HTML5）doctype 替换
                removeEmptyAttributes:true,     //  删除所有带有空格值的属性
                removeStyleLinkTypeAttributes:true,     //type="text/css"从中移除style和link标记。其他type属性值保持不变
                keepClosingSlash:true,          //  将尾部斜杠保留在单元素元素上
                minifyJS:true,                  //  缩小脚本元素和事件属性中的JavaScript（使用UglifyJS）
                minifyCSS:true,                 //  缩小样式元素和样式属性中的CSS（使用clean-css）
                minifyURLs:true                 //  缩小各种属性中的URL（使用relateurl）
            }
        }),
        //  按需加载， 将压缩文件分成多块
        new webpack.optimize.CommonsChunkPlugin({
            name: "chunk",
            children: true,
            minChunks:2,
            async:true,
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') // default value if not specified
            }
        }),
        new ExtractTextPlugin('styles/[name].css'),
    ],
    postcss : [autoprefixer, csswring]

}



