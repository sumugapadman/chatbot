'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatHistorySchema = new Schema({
    userid : {
        type : String,
        unique : true
    },
    connectionStatus : {
        type : String
    },
    chatMessages : [{
        type : Schema.ObjectId,
        ref : 'chatMessage'
    }],
    createdDate : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('chatHistory',chatHistorySchema);