const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const ProgressSchema = new mongoose.Schema({

    // 진행도 공통
});

const Progress = mongoose.model("Progress", ProgressSchema);