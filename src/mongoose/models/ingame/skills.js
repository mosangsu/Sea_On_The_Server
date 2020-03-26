const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const SkillSchema = new mongoose.Schema({

    // 스킬 공통
    name: String,
    detail: String,
    triggers: [{ type: mongoose.Types.ObjectId, ref: 'Trigger' }],
    type: {
        type: [String],
        // 공격형, 방어형, 보조형, 저주형
        enum: ['Offensive', 'Defensive', 'Supportive']
    },
    target: {
        type: Number
    },

    // 공격형일 경우
    damage: {
        type: Number,
        validate: {
            validator: function (v) { return this.type.indexOf('Offensive') != -1 || v == undefined },
            message: 'Not Offensive.'
        }
    },

    // 방어형일 경우


    // 보조형일 경우
    abilities: {
        type: [String],
        // 최대체력, 체력회복, 속도, 공격력, 방어력
        enum: ['Health', 'Recovery', 'Speed', 'Skill', 'Attack', 'Armor'],
        validate: [
            {
                validator: function (v) { return this.type.indexOf('Supportive') != -1 || v.length == 0 },
                message: 'Not Supportive.'
            }
        ]
    },
    values: {
        type: [Number],
        validate: [
            {
                validator: function (v) { return this.type.indexOf('Supportive') != -1 || v.length == 0 },
                message: 'Not Supportive.'
            },
            {
                validator: function (v) { return v.length == this.abilities.length || this.type.indexOf('Supportive') == -1 },
                message: 'Length of array should be equal to ability'
            }
        ]
    },
    durations: {
        type: [Number],
        validate: [
            {
                validator: function (v) { return this.type == 'Supportive' || v.length == 0 },
                message: 'Not Supportive.'
            },
            {
                validator: function (v) { return v.length == this.abilities.length || this.type.indexOf('Supportive') == -1 },
                message: 'Length of array should be equal to ability'
            }
        ]
    }

});

const Skill = mongoose.model("Skill", SkillSchema);