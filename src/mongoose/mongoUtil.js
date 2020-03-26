const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/' + process.env.MONGOOSE_DATABASE_INGAME;

let _db;

module.exports = {

    connectToServer: (callback) => {
        // mongo 연동
        mongoose.connect(url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            _db = client.db;
            return callback(err);
        });
    },

    getDb: () => {
        return _db;
    }
};