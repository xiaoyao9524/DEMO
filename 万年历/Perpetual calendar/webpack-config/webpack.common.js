const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../config");
let entry = {};
let plugins = [
  new CleanWebpackPlugin(["dist"], {
    root: path.resolve(__dirname, "../")
  })
];

for (let i = 0; i < config.length; i++) {
  entry[config[i]["entryName"]] = config[i]["entryPath"];
  let baseConfig = {
    filename: null,
    template: null,
    inject: true,
    chunks: []
  };
  for (let key in config[i]) {
    baseConfig[key] = config[i][key];
  }
  plugins.push(new HtmlWebpackPlugin(config[i]));
}
module.exports = {
  entry,
  output: {
    filename: "js/[chunkhash].bundle.js",
    chunkFilename: "js/[chunkhash].bundle.js",
    path: path.resolve(__dirname, "../", "dist")
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
