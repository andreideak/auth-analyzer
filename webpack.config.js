const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Hard code this to production but can be adapted to accept args to change env.
const mode = 'production';

module.exports = {

    mode,

    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/css"
    },
    resolve: {
      extensions: ['.css', '.scss'],
      alias: {
        // Provides ability to include node_modules with ~
        '~': path.resolve(process.cwd(), 'src'),
      },
    },
    entry: {
      // Will create "styles.css" in "css" dir.
      "styles": './src/sass/main.scss',
    },
    module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          // Load the SCSS/SASS
          { loader: 'sass-loader' },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // Define the filename pattern for CSS.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
};