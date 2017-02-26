var path = require('path');
module.exports = {
  devtool: 'eval',
  entry: [
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};