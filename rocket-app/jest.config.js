/**
 * Tests cover the pure logic layer only: the practice engine, duration
 * scaling, streak math and sequence-data integrity. Those modules deliberately
 * import nothing from react-native, so the suite needs no native mocks and
 * runs in plain node — fast enough to run on every commit.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: { module: 'commonjs', jsx: 'react', types: ['jest', 'node'], esModuleInterop: true } },
    ],
  },
};
