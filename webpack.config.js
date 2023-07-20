const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: './src/index.tsx',
    devServer: {
      static: './dist',
      port: 3000,
      hot: true,
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: {node: 'current'}}],
                ["@babel/preset-react", {runtime: "automatic"}],
                ["@babel/preset-typescript"]
              ],
              plugins: ['@babel/plugin-proposal-class-properties', "@babel/proposal-object-rest-spread"]
            }
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            env.development ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins:
      [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin()
      ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    performance: {
      hints: false
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false
      })],
    },
  }
};
