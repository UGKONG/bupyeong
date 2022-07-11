const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': __dirname + '/src/',
      '@hook': __dirname + '/src/hook.js'
    }
  },
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }, {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.(png|jpg|gif|bmp|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',  // 배포용
            name: '[name].[ext]'
          }
        }]
      }, {
        test: /\.(avi|mp4|wav|webm)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'videos',  // 배포용
            name: '[name].[ext]'
          }
        }]
      }, { 
        test: /\.(c|sa|sc)ss$/, 
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    open: true
  }
}