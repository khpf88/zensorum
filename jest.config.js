module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/deterministic/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'jest.tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@zensorum/canonical': '<rootDir>/packages/canonical/src/index.ts',
    '^@zensorum/replay': '<rootDir>/packages/replay/src/index.ts',
  },
};
