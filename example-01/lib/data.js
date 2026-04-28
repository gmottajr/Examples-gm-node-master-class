/*
* library for storing and editing data
*/

// Dependencies
const fs = require('fs');
const path = require('path');


// Container for the module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir,  filename, data, callback) {
    console.log('This is the base directory: ', lib.baseDir);
    // Open the file for writing
    const gotFilePath = lib.baseDir + dir + '\\' + filename + '.json';
    console.log('This is the file path: ', gotFilePath);
    fs.open(gotFilePath, 'wx', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            // Convert data to string
            const stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if(!err) {
                    fs.close(fileDescriptor, function(err) {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            console.log('This is the error: ', err, 'And this is the file descriptor: ', fileDescriptor);
            callback('Could not create new file, it may already exist');
        }
    });
};

// Read data from a file
lib.read = function(dir, filename, callback) {
    fs.readFile(lib.baseDir + dir + '/' + filename + '.json', 'utf8', function(err, data) {
        callback(err, data);
    });
};

// Update data inside a file
lib.update = function(dir, filename, data, callback) {
    const filePath = lib.baseDir + dir + '\\' + filename + '.json';

    // Check whehter the file exists    
    fs.access(filePath, fs.constants.F_OK, function(err) {
        if(err) {
            console.log('Checking file existence error: ', err);
            callback('File does not exist');
        }
    });

    fs.open(filePath, 'r+', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            // Convert data to string
            const stringData = JSON.stringify(data);
    // Open the file for writing
    fs.open(filePath, 'r+', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            // Convert data to string
            const stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, function(err) {
                if(!err) {
                    // Write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if(!err) {
                            fs.close(fileDescriptor, function(err) {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file for updating: ' + err);
        }
    });
    };
    });
};

lib.delete = function(dir, filename, callback) {
    // Unlink the file from the filesystem
    const filePath = lib.baseDir + dir + '\\' + filename + '.json';

    // Check whehter the file exists
    fs.access(filePath, fs.constants.F_OK, function(err) {
        if(err) {
            console.log('Checking file existence error: ', err);
            callback('File does not exist, there is nothing to delete!');
        }   
    });
    
    fs.unlink(filePath, function(err) {
        if(!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    }); 
}

// Export module
module.exports = lib;