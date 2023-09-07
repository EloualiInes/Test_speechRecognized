const isString = (str) => typeof str === "string";
const isStringEmpty = (str) => isString(str) && str.length > 0;

module.exports = {
    isString,
    isStringEmpty
}