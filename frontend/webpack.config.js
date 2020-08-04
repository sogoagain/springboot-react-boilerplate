const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const SPRING_JS_PATH = '../boilerplate-web/src/main/resources/static/js';
const SPRING_PAGES_PATH = '../boilerplate-web/src/main/resources/templates';

module.exports = (env, argv) => ({
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, SPRING_JS_PATH),
    filename: '[name].js',
    publicPath: '/static/js',
  },
  devtool: argv.mode === 'production' ? false : 'eval-source-maps',
  plugins: [
    new HtmlWebPackPlugin({
      chunks: ['index', 'vendor'],
      template: 'src/index.html',
      filename: path.resolve(__dirname, path.resolve(SPRING_PAGES_PATH, 'index.html')),
    }),
    new AntdDayjsWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/images/${path.basename(resourcePath)}`;
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/fonts/${path.basename(resourcePath)}`;
              },
            },
          },
        ],
      }],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
    ],
    minimize: argv.mode === 'production',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.resolve(__dirname, SPRING_JS_PATH),
    publicPath: '/static/js',
    filename: '[name].js',
    host: 'localhost',
    port: 3000,
    proxy: {
      '**': 'http://localhost:8080',
    },
  },
});
