import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: {
            prettier: {
                recommended: true, // Enables Prettier rules
            },
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
            // 'prettier/prettier': 'warn', // Enables Prettier integration
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];

// npx eslint .
