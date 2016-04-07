var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/app.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'views'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'jsx-loader!babel',
        include: /app/
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer!less'
      },
      {
        test: /\.css/,
        loader: 'style!css'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
}
