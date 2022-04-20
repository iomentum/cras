export default {
  preset: 'vite-jest',
  verbose: true,

  testMatch: [
    '**/*.test.?(m)js?(x)',
  ],
  testEnvironment: 'jest-environment-jsdom'
}