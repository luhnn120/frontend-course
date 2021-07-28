// webpack config
const path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function creatConfig(uuid) {
  return {
    entry: path.resolve(__dirname, './main.js'),
    mode: 'development',
    output: {
      path: path.resolve(__dirname, '../public/', uuid),
      filename: 'component.js',
    },
    module: {
      rules: [{
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
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html')
      })
    ]
  }
}

module.exports = {
  creatConfig
};