var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:7000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pilotlog_ui.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
      loaders: [{
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          include: path.join(__dirname, 'src')
      }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
      }, {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: "file-loader"
      }, {
          test: /\.svg$/,
          loader: 'file'
      }, {
          test: /\.png$/,
          loader: 'file'
      }, {
          test: /\.gif$/,
          loader: 'file-loader'
      }]
  }
};
