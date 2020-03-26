const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const PetSchema = new mongoose.Schema({

    // 펫 공통
    name: String,
    level: Number,
    damage: Number,
    armor: Number,
    speed: Number,
    health: Number,
    experience: Number,
    satiety: Number,
    fatigue: Number,
    intimacy: Number,
    equipments: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Item' }],
        validate: {
            validator: function (v) { return v.length <= 2 },
            message: 'Length of array should be less than 2.'
        }
    },

    skills: [{ type: mongoose.Types.ObjectId, ref: 'Skill' }],

    kind: {
        type: String,
        // 고양이, 개, 올빼미, 곰, 거북, 코끼리, 사슴, 펭귄
        enum: ['Cat', 'Dog', 'Owl', 'Bear', 'Turtle', 'Elephant', 'Deer', 'Penguin']
    },
    personality: {
        type: String,
        // 새침한, 귀여운, 당당한, 친근한, 근엄한, 도도한, 발랄한, 장난스러운, 날렵한, 카리스마적인
        // 멋있는, 매력적인, 사랑스러운, 우아한, 온화한, 신비로운, 진지한, 지적인, 내성적인, 단순한
        enum: ['Coy', 'Cute', 'Dignified', 'Friendly', 'Majestic', 'Lofty', 'Bubbly', 'Playful', 'Nimble', 'Charismatic',
            'Handsome', 'Charming', 'Lovely', 'Elegant', 'Mild', 'Mysterious', 'Serious', 'Intelligent', 'Reserved', 'Simple']
    },
    type: {
        type: String,
        // 공격형, 방어형, 보조형
        enum: ['Offensive', 'Defensive', 'Supportive']
    },
});

const Pet = mongoose.model("Pet", PetSchema);