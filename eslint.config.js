const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-one-line-imports'],
          singleQuote: true,
        },
      ],
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
