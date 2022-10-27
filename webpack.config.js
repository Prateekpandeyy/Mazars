const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path")
const port =  3000;

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    path : path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
       test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader : "babel-loader"
        }, 
        
      },
      {
        test: /\.(pdf|png|jpg|gif)$/,
    use: [
      {
        loader: "file-loader",
        options: {},
      },
    ],


      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
   
    })
  ],

};