var config = require("./config");
var path = require("path");
var toArray = require("lodash.toarray");
var merge = require("lodash.merge");
var fs = require("fs");
var utils = require("./utils");
var debug = utils.debug;

function readConfig(configPath) {
  if(configPath) {
    debug("Loading config from %s", configPath);
    return require(path.resolve(configPath));
  }
  var myrulesConfigPath = path.resolve(config.configFilename);
  if(fs.existsSync(myrulesConfigPath)) {
    debug("Loading config from %s", myrulesConfigPath);
    return utils.readRules(myrulesConfigPath);
  }

  // Attempt to look in package file
  // extension omitted to allow .json and .json5
  var pkgPath = path.resolve("package");
  // This might throw if no package.json[5] file is present
  var projectConfig = {};
  try {
    debug("Loading config from %s", pkgPath);
    projectConfig = require(pkgPath);
  } catch(e) {
    console.warn("Unable to open package.json");
  }
  var lintConfigs = projectConfig[config.pkgConfigName] || {};
  return lintConfigs;
}

module.exports = function(configPath) {
  var lintConfigs = readConfig(configPath);
  lintConfigs.targets = lintConfigs.targets || {};

  config.linterTargets.forEach(function(target) {
    lintConfigs.targets[target] = toArray(lintConfigs.targets[target]);
  });
  return merge(config.defaultConfig, lintConfigs);
};
