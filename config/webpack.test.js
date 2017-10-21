const webpack = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: [helpers.root('node_modules')],
        loader: 'tslint-loader',
        test: /\.ts$/,
      },
      {
        exclude: [/\.e2e\.ts$/],
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            inlineSourceMap: true,
            module: 'commonjs',
            removeComments: true,
            sourceMap: false,
          },
        },
        test: /\.ts$/,
      },
      {
        enforce: 'post',
        exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/],
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        test: /\.(js|ts)$/,
      },
    ],
  },
  performance: { hints: false },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, helpers.root('lib/src')),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src',
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [helpers.root('src'), 'node_modules'],
  },
};
