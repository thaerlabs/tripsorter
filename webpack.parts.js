const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports.typescript = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  }
};

module.exports.tslint = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      }
    ]
  }
};

module.exports.css = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports.html = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

module.exports.images = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};

module.exports.fonts = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
};

module.exports.devServer = {
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
