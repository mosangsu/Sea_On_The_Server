const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const LocationSchema = new mongoose.Schema({

    // 장소 공통
    name: String,
    npc: { type: mongoose.Types.ObjectId, ref: 'NPC' }
});

const Location = mongoose.model("Location", LocationSchema);