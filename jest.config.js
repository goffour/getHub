/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  "verbose": true,
  "testEnvironment": "jest-environment-jsdom",
  "automock": false,
  "globalSetup": './jest-setup.js',
  "globalTeardown": './jest-teardown.js'
};
