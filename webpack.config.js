const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";
const DEV = !PROD;

const config = {
  entry: ["./src/index"],
  output: {
    filename: DEV ? "bundle.js" : "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  mode: DEV ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      { test: /\.mp4$/, loader: "file-loader" },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          outputPath: "images/",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
      favicon: "public/favicon.ico",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css",
      chunkFilename: "styles.[contenthash:6].css",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    inline: true,
    watchOptions: {
      poll: true,
      ignored: "/node_modules/",
    },
  },
};

module.exports = config;
