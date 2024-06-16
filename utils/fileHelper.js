const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    fs.unlink(path.join(__dirname, '..', filePath), (err) => {
        if (err) {
            console.log(`Failed to delete file: ${filePath}`, err);
        }
    });
}

module.exports = {
    deleteFile
}