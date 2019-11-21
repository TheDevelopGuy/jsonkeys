#!/usr/bin/env node
import {Stats} from "fs";
import {Transformer} from "./transformer";
import chalk from "chalk";
import * as fs from "fs";
import program from "commander";
import clear from "clear";
import figlet from "figlet";
import {ValidateConfig} from "./validate-config";

process.title = 'jsonkeys';

process.on('unhandledRejection', err => {
    throw err;
});

clear();

console.log(
    chalk.yellow(
        figlet.textSync('JsonKeys', {font: "Larry 3D" })
    )
);

program
    .version('0.0.4')
    .description("Transform a JSON file to a javascript object, where the keys are the same and each value is the keys order joined by a specified delimiter.")
    .option('-c, --config <file>', 'config input file (required)')
    .option('-w, --watch', 'watch changes in the input file')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

let configFile: any = undefined;
let config: any = undefined;
try {
    configFile = fs.readFileSync(program.config);
    config = JSON.parse(configFile)
} catch (e) {
    console.log(chalk.red('Invalid config file'));
    process.exit(0);
}

config.destinationFile = config.destinationFile || 'jsonkeys.ts';
config.constantName = config.constantName || 'JsonKeys';
config.delimiter = config.delimiter || '.';

try{
    ValidateConfig(config);
} catch (e) {
    console.log(chalk.red(e.message));
    process.exit(0);
}

Transformer(
    config.inputFile,
    config.destinationFile,
    config.constantName,
    config.delimiter
);

if(program.watch) {
    console.log(`JsonKeys - Watching ${config.inputFile}`);
    fs.watchFile(config.inputFile, (curr: Stats, prev: Stats) => {
        Transformer(
            config.inputFile,
            config.destinationFile,
            config.constantName,
            config.delimiter
        )
    });
}
