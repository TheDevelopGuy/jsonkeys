"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
function ValidateConfig(config) {
    if (!config.inputFile) {
        throw new Error("\"inputFile\" key is missing in config file");
    }
    if (!fs.existsSync(config.inputFile)) {
        throw new Error("\"inputFile\" does not exists");
    }
    var dir = path.dirname(config.destinationFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
exports.ValidateConfig = ValidateConfig;
