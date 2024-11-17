const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const path = require("path");
const webpack = require("webpack");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const mode = isEnvProduction
    ? "production"
    : isEnvDevelopment && "development";

  const pathConfig = {
    entry: "./src/index",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
      assetModuleFilename: "images/[hash][ext][query]",
    },
  };

  const devConfig = {
    devtool: isEnvDevelopment ? "hidden-source-map" : "eval",
    devServer: {
      port: 3000,
      hot: true,
    },
  };

  const resolve = {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {},
  };

  const module = {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  };

  const plugins = [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: isEnvProduction
        ? {
            collapseWhitespace: true, // 빈칸 제거
            removeComments: true, // 주석 제거
          }
        : false,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "editor",
      filename: "remoteEntry.js",
      exposes: {
        ".": "./src/components/Editor",
        "./controllers": "./src/exposedControllers",
      },
      shared: {
        react: { singleton: true, eager: true },
      },
    }),
  ];

  return {
    ...pathConfig,
    ...devConfig,
    mode,
    resolve,
    module,
    plugins,
  };
};
