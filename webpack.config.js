const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './client/index.js'
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
		publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.css/i,
        use: [
            'style-loader',
            'css-loader'
          ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
			{//test gives regex file path, use is name of loader
				test: /\.(png|jpg|jpeg|gif|svg)$/i, 
				type: 'asset/resource',
				exclude: /node_modules/
			},
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },

    proxy: {
      '/user' : 'http://localhost:3000',
			'/products' : 'http://localhost:3000',
    },

    compress: true,
    port: 8080,
		historyApiFallback: true
  }
}