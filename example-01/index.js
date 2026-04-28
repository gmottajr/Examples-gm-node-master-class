// Dependencies

const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

const handlers = require('./lib/handlers');
const {httpServer, httpsServer} = require('./lib/servers');

// Define a request router
const router = {
    "sample": handlers.sample
}

// Start the https server
httpsServer.listen(config.httpsPort, function () {
    console.log(`Server is listening on port ${config.httpsPort} now!!! Environment: ${config.envName}`);
});

// Start the server, and have it listen to the port specified in the config file
httpServer.listen(config.httpPort, function () {
    console.log(`Server is listening on port ${config.httpPort} now!!! Environment: ${config.envName}`);
});