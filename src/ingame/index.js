const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
// cmd 함수
require('./communicate');

fs
.readdirSync(__dirname + '/cmds')
.filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
.forEach(file => {
    require(path.join(__dirname + '/cmds', file));
});