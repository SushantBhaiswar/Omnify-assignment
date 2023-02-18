const mongoose = require('mongoose');
const moment = require('moment')

const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Userid: {
        type: String,
        ref: "User",
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    EndTime: {
        type: String,
        required: true
    },
    Day: {
        type: String,
        required: true
    },
    events: {
        type: [String]
    },
    createdAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") },
    updatedAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") }
});

module.exports = mongoose.model('Event', userSchema) 
