'use strict';
const AccountModel = require('../models/accounts');


exports.dehydrate = (fields,payload) => {
    let obj = {};
    for (let field of fields){
        obj[field] = payload[field] || '';
    }
    return obj;
};

exports.seedAccount = (userdetail) => {
    let accountDetail = {
        userid : userdetail.userid,
        balance : 200
    };
    let account = new AccountModel(accountDetail);
    account.save();
};