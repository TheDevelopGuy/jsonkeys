import moment = require("moment");
const fs = require('fs');

export function Transformer(
    src: string,
    destination: string,
    constantName: string
) {
    const data = fs.readFileSync(src);
    const trans = JSON.parse(data);

    const iterate = (obj: any, keyPrefix = '') => {
        Object.keys(obj).forEach((key) => {
            obj[key] = typeof obj[key] === "string" ? `${keyPrefix ? keyPrefix + '.' : ''}${key}` : {
                ...iterate(obj[key], keyPrefix ? `${keyPrefix}.${key}` : key)
            }
        });
        return obj;
    };

    iterate(trans);

    const transKeysFile = `const ${constantName} = ${JSON.stringify(trans)}; export default ${constantName};`;
    fs.writeFileSync(destination, transKeysFile);
    console.log(`[${moment().format('HH:mm:ss')}] New translation keys file was written at '${destination}', constant import name is ${constantName}.`)
}