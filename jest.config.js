const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './apps/web/',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/web/src/$1',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react|recharts|date-fns|d3-shape|d3-path)/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

module.exports = createJestConfig(customJestConfig);