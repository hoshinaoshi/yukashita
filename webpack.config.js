var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
      app: [
        "./js/index.js"
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
          }
        }
      ],
    },
    plugins: debug ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      new webpack.HotModuleReplacementPlugin()
    ],
  },
  {
    entry: './stylesheets/index.scss',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
      filename: 'bundle.css',
    },
    module: {
      rules:[
        {
	  test: /\.scss$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: "style-loader",
              use: ["css-loader", "sass-loader?outputStyle=expanded"]
            }
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css')
    ]
  }
];
