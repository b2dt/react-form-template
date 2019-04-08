const webpack = require('webpack'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}

config.output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'build')
}

config.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: './index.html'
  }),
]

config.module.rules.push({
  test: /\.scss$/,
  use: [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {loader: 'sass-loader'}
  ]
})

config.devServer = {
  contentBase: path.join(__dirname, 'build'),
  port: 8081,
  historyApiFallback: true,
  disableHostCheck: true,
  proxy: {
    "/api": {
      target: `http://localhost:8080`,
      secure: false
    },
    "/login": {
      target: `http://localhost:8080`,
      secure: false
    }
  }
}

module.exports = config