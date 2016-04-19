var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanPlugin = require('clean-webpack-plugin');
var node_modules_dir = path.join(__dirname, 'node_modules');
var node_modules = path.resolve(__dirname, 'node_modules');
var deps = [
  // 'react/dist/react.min.js',
  // 'react-dom/dist/react-dom.min.js',
  'react-router/lib/index.js',
  'react-router-redux/lib/index.js',
  'react-router/lib/index.js',
  'redux/dist/redux.min.js',
  'react-redux/dist/react-redux.min.js',
  'redux-thunk/dist/redux-thunk.min.js'
];

var env = process.env.NODE_ENV;

var config = {
  entry: [
    'webpack-hot-middleware/client',
    './app/main',
  ],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/public/js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  resolve: {
    alias: {}
  },
  module: {
    noParse: [
      path.resolve(node_modules, 'redux/dist/redux.min.js'),
      path.resolve(node_modules, 'redux-thunk/dist/redux-thunk.min.js'),
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader!babel',
        exclude: [node_modules_dir],
        include: /app/
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer!less'
      },
      {
        test: /\.css/,
        loader: 'style!css'
      }
    ]
  }
}

// 通过在第一部分路径的依赖和解压
// 就是你像引用 node 模块一样引入到你的代码中
// 然后使用完整路径指向当前文件，然后确认 Webpack 不会尝试去解析它

deps.forEach(function(dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
// var parsepath = path.resolve(node_modules, dep);
// config.module.noParse.push(parsepath);
});

if (env === 'start' || !env) {
  config = merge(config, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  });
}


if (env === 'production') {
  config = merge(config, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true,
          warnings: false
        },
        sourceMap: false
      })
    ],
  });

}

module.exports = config
