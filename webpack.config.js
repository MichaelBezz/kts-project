const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd
      ? MiniCssExtractPlugin.loader
      : 'style-loader',

    !withModules
      ? 'css-loader'
      : {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: !isProd
              ? '[path][name]__[local]'
              : '[hash:base64]',
          }
        }
      },

    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        }
      }
    },

    'sass-loader'
  ];
};

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  target: isProd ? 'browserslist' : 'web',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: distPath,
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    !isProd && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles()
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      config: path.join(srcPath, 'config'),
      context: path.join(srcPath, 'context'),
      entities: path.join(srcPath, 'entities'),
      services: path.join(srcPath, 'services'),
      store: path.join(srcPath, 'store'),
      styles: path.join(srcPath, 'styles'),
      utils: path.join(srcPath, 'utils')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: [{ directory: path.resolve(__dirname, 'favicon') }]
  }
}
