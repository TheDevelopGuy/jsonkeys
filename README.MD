# JsonKeys
Transform a JSON file to a javascript object, where the keys are the same and each value is the order of the keys joined by a specified delimiter.

This package is very useful when using libraries like i18next or other javascript internationalization-framework to avoid the use of "magic strings".

## Example
Input
```json
{
  "HOME_PAGE": {
    "TITLE": "Hello world",
    "DESCRIPTION": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "NAVIGATION": {
      "HOME_PAGE": "Home Page",
      "ABOUT": "About"
    }
  }
}
```
Output
```js
const JsonKeys = {
    "HOME_PAGE": {
        "TITLE": "HOME_PAGE.TITLE",
        "DESCRIPTION": "HOME_PAGE.DESCRIPTION",
        "NAVIGATION": {
            "HOME_PAGE": "HOME_PAGE.NAVIGATION.HOME_PAGE",
            "ABOUT": "HOME_PAGE.NAVIGATION.ABOUT"
        }
    }
};
export default JsonKeys;
```


## How to

### 1. Installation
```sh
npm install --save-dev jsonkeys
```

### 2. Create a config file
```json
{
    "inputFile": "src/assets/i18n/en.json",
    "destinationFile": "src/constants/translation-keys.ts", 
    "constantName": "TransKeys",
    "delimiter": "."
}
```
Key | Meaning | Default
--- | --- |---
inputFile  | The Json input file | required
destinationFile  | Output object path | jsonkeys.ts
constantName  | What constant name will be exported in the destinationFile | JsonKeys
delimiter  | The delimiter that will be used to join the keys value | .

### 3. Add a script to your package.json
```js
{
  // ...
  "scripts": {
      "json-keys": "jsonkeys -c jsonkeys.config.json -w"
  },
  // ...
}
```

```sh
Options:
  -V, --version        output the version number
  -c, --config <file>  config input file (required)
  -w, --watch          watch changes in the input file
  -h, --help           output usage information
```

### 4. Run
```sh
npm run json-keys
```


License - MIT

Enjoy!
