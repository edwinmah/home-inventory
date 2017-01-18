const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins = [
  new ExtractTextPlugin('./css/bundle.css', { allChunks: true }),
  new HtmlWebpackPlugin({
    template: __dirname + '/client/src/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new CopyWebpackPlugin([{
    from: 'client/src/assets',
    to: 'assets'
  }])
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  );
}

module.exports = {
  entry: __dirname + '/client/src/js/index.jsx',
  output: {
    path: './client/build',
    filename: './js/bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        include: __dirname + '/client/src/js',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: {
    'fs': 'fs'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6']
  },
  plugins: plugins
}
