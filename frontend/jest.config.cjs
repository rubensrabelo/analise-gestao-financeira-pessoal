const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
};
