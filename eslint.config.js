import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
    typescriptEslint.configs.recommended,

    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/no-trailing-spaces': ['error'],
            '@stylistic/no-tabs': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
            '@stylistic/no-mixed-spaces-and-tabs': ['error'],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/comma-spacing': 'error',
            '@stylistic/array-bracket-spacing': 'error',
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/quote-props': ['error', 'as-needed'],
            '@stylistic/jsx-quotes': ['error', 'prefer-single'],
        },
    },
]);