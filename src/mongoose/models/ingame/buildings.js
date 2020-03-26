const mongoose = require('mongoose');
const mongoUtil = require('mongoose/mongoUtil');
const fs = require('fs');

const BuildingSchema = new mongoose.Schema({

    // 건물 공통
});

const Building = mongoose.model("Building", BuildingSchema);