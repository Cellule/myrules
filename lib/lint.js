var eslint = require("eslint");
var copyRules = require("./copyRules");
var config = require("./config");

var exports = module.exports = {};

exports.run = function(lintConfigs, globalTargets) {
  copyRules(lintConfigs, function(err) {
    if(err) {
      return console.error(err);
    }
    console.log("Starting linter");
    var args = process.argv.slice(0, 2);
    args = args
      .concat(config.eslintOptions.split(" "))
      .concat(globalTargets);
    config.linterTargets.forEach(function(target) {
      args = args.concat(lintConfigs.targets[target]);
    });

    eslint.cli.execute(args);
  });
};
