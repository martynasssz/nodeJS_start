const path = require('path');

module.exports = path.dirname(require.main.filename); //gives as the path to file, that is responsible for the fact out application is running
//file name is what we put into dir name to get a path to that directory