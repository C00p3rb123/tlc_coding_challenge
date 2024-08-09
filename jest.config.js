/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  "moduleNameMapper": {
      "\\.(png)$": "<rootDir>/mocks/fileMock.js",
      "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
    }
};