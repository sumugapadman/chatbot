'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    userid : {
        type : String,
    },
    jwt_token : {
        type : String,
    },
    context : {
        type : String,
    },
    message : {
        type : String,
    },
    createdDate : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('chatMessage',chatMessageSchema);