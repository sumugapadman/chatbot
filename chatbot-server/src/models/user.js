'use strict';
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatarid : {
        type : Number,
        unique : true
    },
    userid : {
        type : String,
        unique : true
    },
    useragent : {
        type : String
    },
    timezone : {
        type : String
    },
    ip : {
        type : String
    },
    createdDate : {
        type : Date,
        default : Date.now
    }
});
userSchema.plugin(AutoIncrement, {inc_field: 'avatarid'});

module.exports = mongoose.model('User',userSchema);