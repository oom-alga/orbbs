// eslint.config.js
const globals = require('globals');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        $: 'readonly',
        jQuery: 'readonly'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    },
    // eslintPath: 'eslint/use-at-your-own-risk'
  }
];