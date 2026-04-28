const _data = require('../lib/data');
const {encryptService} = require('./encryptService');
const userService = {};

// Required data: firstName, lastName, email, tosAgreement, phone, password
userService.createUser = function(userData, callback) {
    const valid = validateUserRequiredfields(userData);
    if (valid) {
        // Make sure that the user doesn't already exist
        _data.read('users', userData.payload.phone, function(err, data) {
            if(err) {
                console.log('User does not exist, creating new user');  
                // Hash the password
                const hashedPassword = encryptService.hash(userData.payload.password);
                if (!hashedPassword) {
                    callback(500, {'Error': 'Could not hash the user\'s password.'});
                    return;
                }
                // Create the user object
                const userObject = {
                    'firstName': userData.payload.firstName,
                    'lastName': userData.payload.lastName,
                    'email': userData.payload.email,    
                    'tosAgreement': userData.payload.tosAgreement,
                    'phone': userData.payload.phone,
                    'password': hashedPassword,
                    'tosAgreement': true,
                    'createdAt': Date.now()
                };
                _data.create('users', 'userData.json', userObject, function(err) {
                    if(!err) {
                        callback(201); // Resource created --> 201 is the status code for resource created  
                    } else {
                        console.log('Error creating the new user: ', err);
                        callback(500, {'Error': 'Could not create the new user'});
                    }
                });
            } else {
                console.log('User already exists');
                callback(400, {'Error': 'A user with that phone number already exists'}); // Bad request
            }
        });
        // Hash the password
        // Create the user object
        // Store the user   
        callback(201); // Resource created --> 201 is the status code for resource created
    } else {
        callback(400, {'Error': 'Missing required fields'}); // Bad request
    }   
};

userService.getUser = function(userData, callback) {
    callback(200);
};

userService.updateUser = function(userData, callback) {
    callback(200);
}

userService.deleteUser = function(userData, callback) {
    callback(201);// Successfully deleted --> 201 is the status code for resource created, but we can use it here to indicate that the resource was successfully deleted
}

function validateUserRequiredfields(data) {
    const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    const tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    if (!firstName) {
        console.log('First name is required and must be a non-empty string ');
        return false;
    }
    if (!lastName) {
        console.log('Last name is required and must be a non-empty string ');
        return false;
    }   
    if (!email) {
        console.log('Email is required and must be a non-empty string ');
        return false;
    }
    if (!tosAgreement) {
        console.log('TOS agreement is required and must be true');
        return false;
    }
    if (!phone) {
        console.log('Phone is required and must be a string of 10 characters');
        return false;
    }
    if (!password) {
        console.log('Password is required and must be a non-empty string ');
        return false;
    }
    return true;
}

module.exports = userService;