"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var fs = require('fs');
function Transformer(src, destination, constantName, delimiter) {
    var data = fs.readFileSync(src);
    var jparse = JSON.parse(data);
    var iterate = function (obj, keyPrefix) {
        if (keyPrefix === void 0) { keyPrefix = ''; }
        Object.keys(obj).forEach(function (key) {
            obj[key] = typeof obj[key] === "string" ? "" + (keyPrefix ? keyPrefix + delimiter : '') + key : __assign({}, iterate(obj[key], keyPrefix ? "" + keyPrefix + delimiter + key : key));
        });
        return obj;
    };
    iterate(jparse);
    var transKeysFile = "const " + constantName + " = " + JSON.stringify(jparse) + "; export default " + constantName + ";";
    fs.writeFileSync(destination, transKeysFile);
    console.log("[" + moment().format('HH:mm:ss') + "] New json keys file was written at '" + destination + "', constant import name is " + constantName + ".");
}
exports.Transformer = Transformer;
