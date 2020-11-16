const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const paths = require('../paths');
const getEnvironment = require('../env');

const base = require('./base');

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.htmlTemplateFile,
      inject: true,
      templateParameters: getEnvironment(true),
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  ],
  devServer: {
    contentBase: paths.build,
    port: 3000,
    host: '0.0.0.0',
    compress: true,
    // open: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
});
