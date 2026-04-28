
const helpers = {};

helpers.parseJsonToObject = function(str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        console.log('Error parsing JSON string: ', e);
        return {};
    }   
};