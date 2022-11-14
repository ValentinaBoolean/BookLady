const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: './assets/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: './assets/images/[name][ext]',
    clean: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "./src/index.html",
      filename: "index.html"
    }),
  ],
  // devServer:{
  //   static: './dist'
  // },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource'
      },
    ],
  },
};