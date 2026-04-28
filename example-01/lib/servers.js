
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');

// Instantiate the HTTP server
const httpServer = http.createServer(function (req, res) {
    unifiedServer(req, res);
});


// Instantiate the HTTPS server
const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    unifiedServer(req, res);
});


/// All the server logic for both the http and https server will be for this unifiedServer
const unifiedServer = function(req, res) {
    const parsedUrl = url.parse(req.url, true);

    //Get the path from the URL
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the Payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        console.log('Request received with payload: ', buffer);

        // Choose the handler this request should got to. If one is not found, use the notFound handler
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //Construct the data object to send to the handler
        const data = buildData(trimmedPath, queryStringObject, method, headers, buffer);

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statuscode, payload) {
            // use the status code called back by the handler. or default to 200
            statuscode = typeof (statuscode) == 'number' ? statuscode : 200;
            // use the payload called back by the handler, or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};
            // Convert the payload to a string
            const payloadStr = JSON.stringify(payload);
            const test = JSON.parse(payloadStr);
            res.setHeader('Content-Type', 'application/json');
            // Return the response
            // Send the response
            res.writeHead(statuscode);
            res.end(payloadStr);
            console.log('Returning this response: ', statuscode, payloadStr);
        });
    });
}

function buildData(trimedPath, queryStringObject, method, headers, buffer) {
    return {
        'trimedPath': trimedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer
    };
}

module.exports = {
    httpServer: httpServer,
    httpsServer: httpsServer
};