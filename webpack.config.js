const path = require('path');

module.exports =  {
  devtool: 'eval-source-map',
  entry: path.join(__dirname,'app', 'index.js'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}