import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    { files: ['**/*.{js,mjs,cjs,ts}'] },
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
            '@typescript-eslint': tsPlugin, // Tilføjer TypeScript-specifikke regler
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
            '@typescript-eslint/explicit-function-return-type': 'warn', // Kræver returtyper i TypeScript
            '@typescript-eslint/no-unused-vars': 'error', // Forhindrer ubrugte variabler i TypeScript
            'prettier/prettier': ['warn', { endOfLine: 'crlf' }], // Enables Prettier integration
        },
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic
);

// Error check: npx eslint .
