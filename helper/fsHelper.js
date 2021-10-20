const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * 
 * @param {string} destination The file written to
 * @param {object} content Data you want written to file
 * @returns {void} Nothing
 */
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        if(err) {
            console.error(err);
        }else{
            console.info(`\nData written to ${destination}`);
        }
    });
};


/**
 *  Function to read data from a given file and append content
 * @param {object} content The content you want to append to the file
 * @param {string} file The path tot he file you want to save to
 * @returns {void} Nothing
 */
const readAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        }else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = {readFromFile, writeToFile, readAppend};