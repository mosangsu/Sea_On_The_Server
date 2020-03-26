const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const PlayerSchema = new mongoose.Schema({

    // 플레이어 공통
    userId:{
        type: Number,
        unique: true
    },
    username:{
        type: String,
        unique: true
    },
    realname: String,
    type: {
        type: String,
        // 학생, 학부모
        enum: ['Student', 'Parent'],
        default: 'Student'
    },
    gold: { type: Number, default: 0 },

    quests: [{ type: mongoose.Types.ObjectId, ref: 'Quest' }],
    pets: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
    items: [{ type: mongoose.Types.ObjectId, ref: 'Item' }],
    buildings: [{ type: mongoose.Types.ObjectId, ref: 'Building' }],
    progresses: [{ type: mongoose.Types.ObjectId, ref: 'Progress' }]
});

const Player = mongoose.model("Player", PlayerSchema);

// 유저 계정이 생성될 때 사용
function setPlayer(userId, username, realname) {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터
        const player = new Player({
            userId: userId,
            username: username,
            realname: realname
        });

        const result = await player.save();
        console.log(result);

        // File 데이터

        const db = mongoUtil.getDb();
        const bucket = new mongoose.mongo.GridFSBucket(db);

        const readStream = fs.createReadStream(__dirname + '/user_default.png');
        const uploadStream = bucket.openUploadStreamWithId(player._id, 'user_default.png');

        readStream.pipe(uploadStream);
    });
}

module.exports =  {
     setPlayer : setPlayer
};