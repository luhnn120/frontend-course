const path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './app.vue'),
  mode: 'development',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../public/', 'dist'),
    filename: 'component.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // ... 忽略 vue-loader 插件
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};