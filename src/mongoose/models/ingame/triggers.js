const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const TriggerSchema = new mongoose.Schema({

    // 트리거 공통
    not: {
        type: Number,
        alias: 'number_of_times',
        default: 1
    },

    allies: {
        health: [Number],
        sign: [String]
    },

    enemies: {
        health: [Number],
        sign: [String]
    }
});

const Trigger = mongoose.model("Trigger", TriggerSchema);