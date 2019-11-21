#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var transformer_1 = require("./transformer");
var chalk_1 = __importDefault(require("chalk"));
var fs = __importStar(require("fs"));
var commander_1 = __importDefault(require("commander"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var validate_config_1 = require("./validate-config");
process.title = 'jsonkeys';
process.on('unhandledRejection', function (err) {
    throw err;
});
clear_1.default();
console.log(chalk_1.default.yellow(figlet_1.default.textSync('JsonKeys', { font: "Larry 3D" })));
commander_1.default
    .version('0.0.4')
    .description("Transform a JSON file to a javascript object, where the keys are the same and each value is the keys order joined by a specified delimiter.")
    .option('-c, --config <file>', 'config input file (required)')
    .option('-w, --watch', 'watch changes in the input file')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
    process.exit(1);
}
var configFile = undefined;
var config = undefined;
try {
    configFile = fs.readFileSync(commander_1.default.config);
    config = JSON.parse(configFile);
}
catch (e) {
    console.log(chalk_1.default.red('Invalid config file'));
    process.exit(0);
}
config.destinationFile = config.destinationFile || 'jsonkeys.ts';
config.constantName = config.constantName || 'JsonKeys';
config.delimiter = config.delimiter || '.';
try {
    validate_config_1.ValidateConfig(config);
}
catch (e) {
    console.log(chalk_1.default.red(e.message));
    process.exit(0);
}
transformer_1.Transformer(config.inputFile, config.destinationFile, config.constantName, config.delimiter);
if (commander_1.default.watch) {
    console.log("JsonKeys - Watching " + config.inputFile);
    fs.watchFile(config.inputFile, function (curr, prev) {
        transformer_1.Transformer(config.inputFile, config.destinationFile, config.constantName, config.delimiter);
    });
}
