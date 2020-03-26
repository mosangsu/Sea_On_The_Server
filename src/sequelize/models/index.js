const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = {};
config['ingame'] = require(path.join(__dirname, '..', 'config', 'config_ingame.js'))[env];
config['web'] = require(path.join(__dirname, '..', 'config', 'config_web.js'))[env];
const db = {};
const databases = Object.keys(config);

for (let i = 0; i < databases.length; i++) {
    const database = databases[i];
    const dbPath = config[database];
    db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, dbPath );
}

fs
    .readdirSync(__dirname + '/ingame')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = db.ingame.import(path.join(__dirname + '/ingame', file));
        db[model.name] = model;
    });

fs
    .readdirSync(__dirname + '/web')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = db.web.import(path.join(__dirname + '/web', file));
        db[model.name] = model;
    });



Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
