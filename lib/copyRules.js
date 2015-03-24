var path = require("path");
var fs = require("fs");
var async = require("async");
var config = require("./config");
var beautify = require("js-beautify");

var globalConfigPath = path.resolve(__dirname, "../rules/global.eslintrc");

function copyRules(lintConfig, doneCopying) {
  console.log("Copying latest lint rules");
  // Copy all config files asynchronously
  async.parallel([
    function(callback) {
      var dst = path.resolve(".eslintrc");
      console.log("Copying global rules to %s", dst);
      // Copy global.eslintrc to //.eslintrc
      var readStream = fs.createReadStream(globalConfigPath);
      var writeStream = fs.createWriteStream(dst);
      writeStream.on("finish", callback);
      readStream.pipe(writeStream);
    },
    function(callback) {
      async.each(config.linterTargets, function(target, nextTarget) {
        var thisTargetList = lintConfig.targets[target] || [];
        if(thisTargetList.length === 0) {
          return nextTarget();
        }
        var targetRulesPath = path.resolve(
          __dirname,
          "../rules/" + target + ".eslintrc"
        );
        // this might crash and it should since the rules file must exist
        // and be valid
        var rules = beautify(JSON.stringify(fs.readFileSync(targetRulesPath)));
        // TODO:: process rules with additionnal config before stringify

        async.each(lintConfig.targets[target], function(folder, nextFolder) {
          var folderPath = path.resolve(folder);
          async.waterfall([
            function(nextWaterfall) {
              // Check if the folder exists
              fs.stat(folderPath, nextWaterfall);
            },
            function(stats, nextWaterfall) {
              var dst = path.resolve(folderPath, ".eslintrc");
              console.log("Copying %s rules to %s", target, dst);
              // Copy target.eslintrc to /targetFolder/.eslintrc
              fs.writeFile(rules, nextWaterfall);
            }
          ], nextFolder);
        }, nextTarget);
      }, callback);
    }
  ], doneCopying);
}

module.exports = copyRules;
