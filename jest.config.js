module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // -- coverage configuration -- //
  collectCoverage: true,
  collectCoverageFrom: ['src/lib/**/*.{js,jsx,mjs}'],
  coverageReporters: [
    'cobertura',
    'html',
    'text'
  ],
  coverageDirectory: 'coverage',
  // -------------------- //

  moduleFileExtensions: ['js', 'json', 'jsx'],

  setupFiles: ['jest-canvas-mock'],

  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  testPathIgnorePatterns: ['node_modules'],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};
