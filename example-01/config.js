/*
* create and export configuration variables
*/

// Containers for configuration

const configurations = {};

configurations.hashingSecret = 'thisIrMySuper#TerribleSecret!@3333';

// containers for all the environments
const environments = {};

// development environment - default
environments.development = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'development'
};

// UAT environment
environments.uat = {
    'httpPort': 3002,
    'httpsPort': 3003,
    'envName': 'uat'
};

// staging environment
environments.staging = {
    'httpPort': 3004,
    'httpsPort': 3005,
    'envName': 'staging'
};

// production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production'
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to development
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
module.exports = {configurations, environmentToExport};