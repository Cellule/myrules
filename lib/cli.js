require("json5/lib/require");
var lint = require("./lint");
var getLinterConfig = require("./getLinterConfig");

var program = require("commander");
program.version(module.exports.version);

program
  .description("lint your project")
  .option(
    "-c, --config <config_path[.js|.json|.json5]>",
    "Path to the config file"
  )
  .action(function() {
    var command = arguments[arguments.length - 1];
    var config = getLinterConfig(command.config);

    lint.run(
      config,
      // pass all other arguments that came first
      Array.prototype.slice.call(arguments, 0, arguments.length - 1)
    );
  });

var exports = module.exports = {};

exports.execute = function(args) {
  program.parse(args);
};

