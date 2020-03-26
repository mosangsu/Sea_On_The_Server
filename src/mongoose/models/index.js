const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const db = {};

fs
    .readdirSync(__dirname + '/ingame')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        db[file.substring(0, file.length - 3)] = require(path.join(__dirname + '/ingame', file));
    });

module.exports = db;