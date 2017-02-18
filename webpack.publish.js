var webpack = require("webpack");
var version = require("./package.json").version;
var banner =
  "/**\n" +
  " * Mueditor v" + version + "\n" +
  " * https://github.com/ginuim/mueditor\n" +
  " * Apache License\n" +
  " */\n";

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: "./dist",
    filename: "mueditor.common.js",
    // library: "Mueditor",
    libraryTarget: "umd"
  },
  externals: /^[^.]/,
  plugins: [
    new webpack.BannerPlugin(banner, { raw: true })
  ],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: "vue"
    }, {
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
}
