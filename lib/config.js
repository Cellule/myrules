var path = require("path");
var pkg = require(path.resolve(__dirname, "../package.json"));

module.exports = {
  pkgConfigName: pkg.name,
  version: pkg.version,
  configFilename: ".myrulesrc",
  // List all the different types of rules you have, this is useful to
  // override configs in global.eslintrc
  linterTargets: ["frontend", "backend"],
  eslintOptions: "--ext .js --ext .jsx",
  defaultConfig: {
    targets: {
      frontend: [],
      backend: [],
      global: []
    },
    modifiers: {
      react: true
    },
    extraRules: {
      frontend: {},
      backend: {},
      global: {}
    }
  }
};
