var path = require("path");
var pkg = require(path.resolve(__dirname, "../package.json"));

module.exports = {
  pkgConfigName: pkg.name,
  // List all the different types of rules you have, this is useful to
  // override configs in global.eslintrc
  linterTargets: ["frontend", "backend"],
  eslintOptions: "--ext .js --ext .jsx"
};