const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const ItemSchema = new mongoose.Schema({

    // 아이템 공통
    name: String,
    detail: String,
    // 0: 구매가, 1: 판매가
    prices: {
        type: [Number],
        validate: {
            validator: function (v) { return v.length <= 2 },
            message: 'Length of array should be less than or equal to 2.'
        }
    },
    type: {
        type: String,
        // 소비, 장비, 가구, 기타
        enum: ['Consumption', 'Equipment', 'Furniture', 'Etc']
    },

    // 소비 아이템 또는 장비 아이템일 경우
    abilities: {
        type: [String],
        // 최대체력, 체력회복, 속도, 공격력, 방어력, 경험치, 포만감, 피로도, 친밀감
        enum: ['Health', 'Recovery', 'Speed', 'Attack', 'Armor', 'Experience', 'Satiety', 'Fatigue', 'Intimacy'],
        validate: {
                validator: function (v) { return this.type == 'Consumption' || this.type == 'Equipment' || v.length == 0 },
                message: 'Not Consumption and Not Equipment.'
        }
    },
    values: {
        type: [Number],
        validate: [
            {
                validator: function (v) { return this.type == 'Consumption' || this.type == 'Equipment' || v.length == 0 },
                message: 'Not Consumption and Not Equipment.'
            },
            {
                validator: function (v) { return v.length == this.abilities.length || (this.type != 'Consumption' && this.type != 'Equipment') },
                message: 'Length of array should be equal to ability'
            }
        ]
    },

    // 소비 아이템일 경우
    durations: {
        type: [Number],
        validate: [
            {
                validator: function (v) { return this.type == 'Consumption' || v.length == 0 },
                message: 'Not Consumption.'
            },
            {
                validator: function (v) { return v.length == this.abilities.length || this.type != 'Consumption' },
                message: 'Length of array should be equal to ability'
            }
        ]
    },

    // 가구 아이템일 경우
    width: {
        type: Number,
        validate: {
            validator: function (v) { return this.type == 'Furniture' || v == undefined },
            message: 'Not Furniture.'
        }
    },
    height: {
        type: Number,
        validate: {
            validator: function (v) { return this.type == 'Furniture' || v == undefined },
            message: 'Not Furniture.'
        }
    }
});

const Item = mongoose.model("Item", ItemSchema);

// 운영자용 페이지 구현 시 사용
function setItem(name, detail, prices, type, abilities, values, durations, width, height) {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터

        const item = new Item({
            name: name,
            detail: detail,
            prices: prices,
            type: type,
            abilities: abilities,
            values: values,
            durations: durations,
            width: width,
            height: height
        });

        await item.save();
        console.log(item);
    });
}

// 아이템 검색 시 사용
function getItem(res, name) {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터

        const item = await Item.findOne({name: name});
        console.log(item);

        // File 데이터

        const db = mongoUtil.getDb();
        const bucket = new mongoose.mongo.GridFSBucket(db);

        const writeStream = fs.createWriteStream(__dirname + '/test2.jpg');
        const downloadStream = bucket.openDownloadStream(item._id);

        downloadStream.pipe(writeStream);
    });
}

module.exports =  {
    setItem: setItem,
    getItem: getItem
};