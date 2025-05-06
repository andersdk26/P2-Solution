import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginPrettier from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: false,
                ecmaVersion: 'latest',
                sourceType: 'module',
                impliedStrict: true,
            },
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: {
            prettier: pluginPrettier,
            '@typescript-eslint': tsPlugin, // Adds TypeScript specific rules
        },
        rules: {
            'no-console': 'off', // Allows the use of console.log()
            'no-path-concat': 'error', // Disallows string concatenation with __dirname and __filename
            'no-useless-return': 'warn', // Warns about redundant return statements
            'no-useless-concat': 'warn', // Warns about unnecessary string concatenation
            'no-useless-escape': 'warn', // Warns about unnecessary escape characters
            'no-else-return': 'warn', // Warns about redundant else blocks
            'no-var': 'error', // Enforces let/const instead of var
            'prefer-const': 'warn', // Suggests const when variables are not reassigned
            'no-unused-vars': 'warn', // Warns about unused variables
            eqeqeq: 'error', // Requires strict equality (=== instead of ==)
            'arrow-body-style': ['error', 'as-needed'], // Enforces concise arrow functions
            'prefer-template': 'error', // Prefers template literals over string concatenation
            'object-shorthand': 'error', // Requires shorthand syntax in object literals
            'prefer-arrow-callback': 'warn', // Encourages arrow functions for callbacks
            '@typescript-eslint/explicit-function-return-type': 'warn', // Requires return type in TypeScript
            '@typescript-eslint/no-unused-vars': 'warn', // Warns about unused variables in TypeScript
            'prettier/prettier': ['off', { endOfLine: 'crlf' }], // Enables Prettier integration
        },
    },
];

export default eslintConfig;

// npx eslint .
