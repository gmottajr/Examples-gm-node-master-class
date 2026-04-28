
const crypto = require('crypto');
const config = require('../config');
const encryptService = {};

// Create a SHA256 hash
encryptService.hash = function(password) {
        if (typeof (password) == 'string' && password.trim().length > 0) {
            const hash = crypto.createHmac('sha256', config.configurations.hashingSecret).update(password).digest('hex');
            return hash;    
        }
        return '';
}

module.exports = encryptService;