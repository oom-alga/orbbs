const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Import PurgeCSS config
const purgeCSSConfig = require('./purgecss.config.js');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Dapatkan semua file Pug dari folder pages
const pugFiles = glob.sync('./src/pug/pages/**/*.pug');

// Buat array plugins
const plugins = [];

// Tambahkan MiniCssExtractPlugin untuk semua mode
plugins.push(
  new MiniCssExtractPlugin({
    filename: isDevelopment ? 'css/[name].css' : 'css/[name].[contenthash].css'
  })
);

// Tambahkan PurgeCSS hanya untuk production
if (!isDevelopment) {
  plugins.push(purgeCSSConfig);
}

// Tambahkan HtmlWebpackPlugin untuk setiap file Pug
pugFiles.forEach(pugFile => {
  const filename = path.basename(pugFile).replace('.pug', '.html');
  plugins.push(
    new HtmlWebpackPlugin({
      template: pugFile,
      filename: filename,
      minify: !isDevelopment ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : false
    })
  );
});

// Tambahkan webpack.ProvidePlugin untuk jQuery modular
plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery/src/core',
    jQuery: 'jquery/src/core'
  })
);

// Tambahkan plugin untuk development
if (isDevelopment) {
  // Tambahkan ESLintPlugin tanpa eslintPath
  plugins.push(
    new ESLintPlugin({
      extensions: ['js'],
      fix: true,
      emitWarning: true,
      lintDirtyModulesOnly: true
    }),
    new StylelintPlugin({
      // files: ['src/**/*.{css,scss}'],
      files: ['src/**/*.{scss}'],
      fix: true
    })
  );
}

// Tambahkan BundleAnalyzer untuk production
if (!isDevelopment) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  );
}

// Konfigurasi optimasi
const optimizationConfig = {
  minimize: !isDevelopment,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
        },
        compress: {
          drop_console: !isDevelopment,
        }
      },
    }),
    new CssMinimizerPlugin()
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
};

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: ''
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // Memperbaiki path relatif
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
              sassOptions: {
                outputStyle: isDevelopment ? 'expanded' : 'compressed',
                includePaths: ['node_modules']
              }
            }
          }
        ]
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // Memperbaiki path relatif
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              importLoaders: 1
            }
          },
        ]
      },
      // Pug
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: isDevelopment
          }
        }]
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 8 * 1024
      //     }
      //   },
      //   generator: {
      //     filename: 'assets/images/[name].[hash][ext]'
      //   },
      //   use: !isDevelopment ? [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: { progressive: true, quality: 65 },
      //         optipng: { enabled: true },
      //         pngquant: { quality: [0.65, 0.90], speed: 4 },
      //         gifsicle: { interlaced: false }
      //       }
      //     }
      //   ] : []
      // },

      // Videos
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/videos/[name].[hash][ext]'
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]'
        }
      }
    ]
  },
  optimization: optimizationConfig,
  plugins: plugins,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.pug', 'src/**/*.scss'],
      options: {
        usePolling: false,
      },
    },
    compress: true,
    port: 4194,
    hot: true,
    open: {
      app: {
        name: ['google-chrome', '--incognito'],
      }
    },
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: false
    },
    devMiddleware: {
      stats: {
        all: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        modules: false,
        assets: false,
        chunks: false,
        colors: true
      }
    }
  },
  stats: {
    children: false,
    chunks: false,
    modules: false,
    assets: !isDevelopment
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@js': path.resolve(__dirname, 'src/js'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@images': path.resolve(__dirname, 'src/assets/images')
    }
  },
  performance: {
    hints: !isDevelopment ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};