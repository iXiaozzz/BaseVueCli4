/* eslint-disable no-undef */
/* eslint-disable new-cap */
const path = require('path')
const sourceMap = process.env.NODE_ENV === 'development'
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
// const vConsolePlugin = require('vconsole-webpack-plugin') // 引入 移动端模拟开发者工具
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // Webpack包文件分析器
module.exports = {
    publicPath: './',
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录
    lintOnSave: true, // 是否开启eslint保存检测，有效值：true || false || 'error'
    chainWebpack: () => { },
    configureWebpack: config => {
        // 生产and测试环境
        let pluginsPro = [
            new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                threshold: 8192,
                minRatio: 0.8
            })
        ]
        // 开发环境
        let pluginsDev = [
            // 移动端模拟开发者工具
            // new vConsolePlugin({
            //   filter: [], // 需要过滤的入口文件
            //   enable: true // 发布代码前记得改回 false
            // }),
            // Webpack包文件分析器
            // new BundleAnalyzerPlugin()
        ]
        if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
            config.plugins = [...config.plugins, ...pluginsPro]
        } else {
            // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev]
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                extensions: ['.js', '.vue', '.json', 'jsx'],
                alias: {
                    vue$: 'vue/dist/vue.js',
                    '@': path.resolve(__dirname, './src')
                }
            }
        })
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: sourceMap,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    // autoprefixer(),
                    // pxtorem({
                    //     rootValue: 54,
                    //     propList: ['*']
                    // })
                ]
            }

        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    devServer: {
        open: false,
        hotOnly: true, // 热更新
        proxy: {
            '/api': {
                target: 'http://uatstudy.aihuaol.com/api',
                // target: 'http://192.168.1.50:8080/api',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/group1': {
                // 映射为图片服务器.
                target: 'http://192.168.1.230:8089', // 后端接口的地址.
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true // 是否跨域
            }
        },
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {
    }
}