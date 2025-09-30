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
          singleQuote: true, // Enforce single quotes
          // You can add other Prettier options here too
        },
      ],
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
