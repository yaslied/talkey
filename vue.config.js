const path = require('path')
const appConfig = require('./src/config').config
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VuetifyLoaderPlugin } = require('vuetify-loader')


module.exports = {
  //configure webpack
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    plugins: [
      // CKEditor needs its own plugin to be built using webpack.
      new webpack.DefinePlugin({
        'process.env.appConfig': JSON.stringify(appConfig),
      }),
      new VuetifyLoaderPlugin({
        match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
            ]
          }
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'link.html',
        template: 'public/index.html',
        inject: false,
      }),
    ],
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './node_modules/@material/'),
          ],
        },
        //   importer:importerFCM
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('scss')
      .oneOf('vue-modules')
      .use('sass-loader')
      .tap((args) => {
        args.sassOptions = args.sassOptions || {}
        args.sassOptions.includePaths = [
          './node_modules',
          './node_modules/@material/',
        ]

        //   args.includePaths = ["./node_modules", "./node_modules/@material/"]
        //   args.importer = importerFCM
        return args
      })
  },
}
