const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const paths = require('../paths');
const getEnvironment = require('../env');

const publicCopyIgnore = ['**/.DS_Store', paths.htmlTemplateFile];

module.exports = {
  target: 'web',
  entry: {
    app: paths.appIndexFile,
  },
  output: {
    path: paths.build,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        include: paths.src,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 4096,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: require.resolve('file-loader'),
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        loader: require.resolve('file-loader'),
        options: {
          name: 'media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', paths.nodeModules],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
  optimization: {
    // Automatically split vendor and commons
    splitChunks: {
      chunks: 'all',
    },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new webpack.DefinePlugin(getEnvironment()),
    new CopyPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.build,
          toType: 'dir',
          globOptions: {
            ignore: publicCopyIgnore,
          },
        },
      ],
    }),
    new CaseSensitivePathsPlugin(),
  ],
};
