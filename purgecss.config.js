const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

// Path relatif ke root project
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

// Konfigurasi PurgeCSS
const purgeCSSConfig = new PurgeCSSPlugin({
  paths: glob.sync([
    path.join(PATHS.src, 'pug', '**', '*.pug'),
    path.join(PATHS.dist, '**', '*.html')
  ]),
  safelist: {
    // Class dari library Splide yang perlu dipertahankan
    standard: [
      'splide', 
      /^splide/, // Menangkap semua class yang dimulai dengan 'splide'
      /splide$/, // Menangkap class yang diakhiri dengan 'splide'
      /splide-/, // Menangkap class dengan format 'splide-sesuatu'
      /-splide/, // Menangkap class dengan format 'sesuatu-splide'
      /data-/,   // Menangkap semua atribut data-
      /^is-/     // Menangkap class yang dimulai dengan 'is-'
    ],
    // Class lainnya yang perlu dipertahankan
    deep: [/^js-/],
    // Package dari node_modules
    greedy: [/^node_modules/]
  },
  // Jangan proses file JS
  rejected: true
});

module.exports = purgeCSSConfig;