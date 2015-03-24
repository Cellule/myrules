require("json5/lib/require");
var lint = require("./lint");
var getLinterConfig = require("./getLinterConfig");
var config = require("./config");

var program = require("commander");
program.version(config.version);

program
  .usage("lint your project")
  .option(
    "-c, --config <config_path[.js|.json|.json5]>",
    "Path to the config file"
  );

var exports = module.exports = {};

exports.execute = function(args) {
  var options = program.parse(args);
  var linterConfig = getLinterConfig(options.config);

  lint.run(
    linterConfig,
    options.args
  );
};

