import moment = require("moment");
const fs = require('fs');

export function Transformer(
    src: string,
    destination: string,
    constantName: string,
    delimiter: string
) {
    const data = fs.readFileSync(src);
    const jparse = JSON.parse(data);

    const iterate = (obj: any, keyPrefix = '') => {
        Object.keys(obj).forEach((key) => {
            obj[key] = typeof obj[key] === "string" ? `${keyPrefix ? keyPrefix + delimiter : ''}${key}` : {
                ...iterate(obj[key], keyPrefix ? `${keyPrefix}${delimiter}${key}` : key)
            }
        });
        return obj;
    };

    iterate(jparse);

    const transKeysFile = `const ${constantName} = ${JSON.stringify(jparse)}; export default ${constantName};`;
    fs.writeFileSync(destination, transKeysFile);
    console.log(`[${moment().format('HH:mm:ss')}] New json keys file was written at '${destination}', constant import name is ${constantName}.`)
}
