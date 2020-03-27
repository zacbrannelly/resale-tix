const webpack = require("webpack");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.(css|less|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader?name=static/[hash].[ext]',
            options: {
              limit: 8192,
              outputPath: './client/static'
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          REACT_APP_CORE_API: JSON.stringify("http://localhost:8000/api/")
        }
      }
    })
  ]
};
