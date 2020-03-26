const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const StorageSchema = new mongoose.Schema({

    // 창고 공통
    items: {
        type: [{
            item: { type: mongoose.Types.ObjectId, ref: 'Item', required: true},
            num: {
                type: Number,
                validate: {
                    validator: function (v) { return v <= 100 },
                    message: 'num should be less than or equal to 100.'
                }
            },
            x: {
                type: Number,
                validate: {
                    validator: function (v) { return v < 5 },
                    message: 'x should be less than 5.'
                }
            },
            y: {
                type: Number,
                validate: {
                    validator: function (v) {return v < 4 },
                    message: 'y should be less than 4.'
                }
            }
        }],
        validate: {
            validator: function (v) { return v.length <= 20 },
            message: 'Length of array should be less than or equal to 20.'
        }
    }
});

const Storage = mongoose.model("Storage", StorageSchema);

function setStorage() {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터

        const storage = new Storage({
            items: [{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            },{
                item: null,
                x: 1,
                y: 1,
            }]
        });

        await storage.save();
        console.log(storage);
    });
}

// setStorage();