// Define Handlers
const handlers = {};

handlers.sample = function(data, callback){
    // Callback a http status code and a payload object
    callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback){
    callback(404, {'name': 'not found'});
};

module.exports = handlers;