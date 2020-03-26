const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const NPCSchema = new mongoose.Schema({

    // npc 공통
    name: String,
    type: {
        type: [String],
        // 도우미, 의뢰, 상인, 건축가, 조련사, 전문가, 의사, 던전
        enum: ['Guide', 'Quest', 'Merchant', 'Architect', 'Trainer', 'Expert', 'Doctor', 'Dungeon']
    },
    scripts: [String],
    location: String,

    // 도우미

    // 의뢰
    quests: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Quest' }],
        validate: {
            validator: function (v) { return this.type.indexOf('Quest') != -1 || v.length == 0 },
            message: 'Not Quest.'
        }
    },

    // 상인
    products: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Item' }],
        validate: {
            validator: function (v) { return this.type.indexOf('Merchant') != -1 || v.length == 0 },
            message: 'Not Merchant.'
        }
    },

    // 건축가
    buildings: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Building' }],
        validate: {
            validator: function (v) { return this.type.indexOf('Architect') != -1 || v.length == 0 },
            message: 'Not Architect.'
        }
    },

    // 조련사
    pets: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
        validate: {
            validator: function (v) { return this.type.indexOf('Trainer') != -1 || v.length == 0 },
            message: 'Not Trainer.'
        }
    },

    // 전문가
    skills: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Skill' }],
        validate: {
            validator: function (v) { return this.type.indexOf('Expert') != -1 || v.length == 0 },
            message: 'Not Expert.'
        }
    },

    // 의사

    // 던전

});

const NPC = mongoose.model("NPC", NPCSchema);
const Item = mongoose.model("Item");

// 운영자용 페이지 구현 시 사용
const getNPC = (location) => {
    return new Promise((resolve, reject) => {
        mongoUtil.connectToServer(async (err) => {

            // DB 데이터
            NPC.findOne({location: location}).populate('products').then(npc => {
                resolve(npc);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

module.exports =  {
    getNPC: getNPC
};