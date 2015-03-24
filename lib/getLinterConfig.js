var config = require("./config");
var path = require("path");
var toArray = require("lodash.toarray");

module.exports = function(configPath) {
  if(configPath) {
    return require(path.resolve(configPath));
  }
  // Attempt to look in package file
  // extension omitted to allow .json and .json5
  var pkgPath = path.resolve("package");
  // This might throw if no package.json[5] file is present
  var projectConfig = {};
  try {
    projectConfig = require(pkgPath);
  } catch(e) {
    console.warn("Unable to open package.json");
  }
  var lintConfigs = projectConfig[config.pkgConfigName] || {};
  lintConfigs.targets = lintConfigs.targets || {};

  config.linterTargets.forEach(function(target) {
    lintConfigs.targets[target] = toArray(lintConfigs.targets[target]);
  });

  return lintConfigs;
};