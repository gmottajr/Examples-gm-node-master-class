
const {userService} = require('./services/userService');

// Define Handlers
const handlers = {};

handlers.sample = function(data, callback){
    // Callback a http status code and a payload object
    callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback){
    callback(404, {'name': 'not found'});
};

handlers.users = function(data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405); // Method not allowed
    }
};

// Container for the users submethods
handlers._users = {};

// Users - post'
handlers._users.post = function(data, callback) {
    createUser(data, callback);
};

handlers._users.get = function(data, callback) {
    callback(200);
};

handlers._users.put = function(data, callback) {
    callback(200);
};

handlers._users.delete = function(data, callback) {
    callback(201);// Successfully deleted --> 201 is the status code for resource created, but we can use it here to indicate that the resource was successfully deleted
};

module.exports = handlers;


