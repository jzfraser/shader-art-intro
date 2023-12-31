const path = require("path");

module.exports = {
  entry: "./src/art.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
