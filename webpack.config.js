var path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js(|x)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/transform-react-jsx",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};
