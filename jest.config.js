module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Ensure .ts and .tsx files are transpiled using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'],
  };
  