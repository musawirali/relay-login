const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __dirname,
      'node_modules',
    ],
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },

  entry: {
    client: ['./src/client/index.js'],
  },

  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/',
  },
};
