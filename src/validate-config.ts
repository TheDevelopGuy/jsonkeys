import {Config} from "./config";
import * as fs from "fs";
import * as path from "path";

export function ValidateConfig(config: Config) {
    if(!config.inputFile){
        throw new Error(`"inputFile" key is missing in config file`);
    }
    if(!fs.existsSync(config.inputFile)) {
        throw new Error(`"inputFile" does not exists`);
    }
    const dir = path.dirname(config.destinationFile);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}