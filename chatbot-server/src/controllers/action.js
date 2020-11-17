'use strict';

const { response } = require('express');
const jwtAuth = require('../helpers/jwtAuth');
const AccountModel = require('../models/accounts');
const chatHistory = require('../models/chatHistory');

class ActionController {

    constructor() {}

    async postAction(req, res, next) {
        const token = req.body.sender_id;
        let requestAction = req.body.next_action;
        console.log('Requested action: ' + requestAction);
        let responseText;

        try {
            let auth = new jwtAuth();
            let guestDetails = auth.decode(token);
            let audience = process.env.CLIENT_HOST_URL;
            auth.setOptions('finchatbot', guestDetails.payload.userid, audience);
            let result = auth.verifyToken(token);
            let userid = result.userid;

            if (requestAction === 'action_account_balance') {
                let account = await AccountModel.findOne({userid});
                let balance = account.balance;
    
                responseText = 'You have $' + balance + ' in your account';
            } else if (requestAction === 'action_goodbye') {
                let history = await chatHistory.findOneAndUpdate({ userid }, { connectionStatus: 'completed' });
                responseText = 'Bye. See you later';
            }
        } catch (err) {
            console.log(err.message);
            responseText = 'Authentication failed. Refresh your browser';
        }

        res.status(200).json({
            events: [{
                event: "action"
            }],
            responses: [{
                text: responseText
            }]
        });
    }
}

module.exports = new ActionController();