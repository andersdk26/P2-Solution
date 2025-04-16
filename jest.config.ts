const jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
            'babel-jest',
            { configFile: './jest/.babelrc.js' },
        ],
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^db$': '<rootDir>/src/db/index.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },

    transformIgnorePatterns: [
        '/node_modules/(?!(@my-org|another-esm-lib|lodash-es)/)',
    ],
};

export default jestConfig;
