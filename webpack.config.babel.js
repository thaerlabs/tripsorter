const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

const TARGET = process.env.npm_lifecycle_event;

const commonConfig = merge(
  {
    entry: {
      app: './src/index.tsx'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'build'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  parts.typescript,
  parts.tslint,
  parts.html,
  parts.css,
  parts.images,
  parts.fonts
);

const getConfig = TARGET => {
  switch (TARGET) {
    case 'build':
      return merge(commonConfig, {
        mode: 'production'
      });
    case 'dev':
    default:
      return merge(
        commonConfig,
        {
          mode: 'development',
          devtool: 'cheap-module-eval-source-map'
        },
        parts.devServer
      );
  }
};

module.exports = getConfig(TARGET);
