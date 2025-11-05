const { createDefaultPreset } = require("ts-jest");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],

  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "^src/(.*)$": "<rootDir>/src/$1",
    "^.*config/envConfig$": "<rootDir>/src/config/__mocks__/envConfig.ts"
  },

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json" // ✅ movido para cá
      }
    ]
  }
};
