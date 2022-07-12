/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  "verbose": true,
  "testEnvironment": "jest-environment-jsdom",
  "automock": false,
  "setupFiles": ['./jest-setup.js', './server/server.js']
};
