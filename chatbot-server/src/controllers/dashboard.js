'use strict';
const users = require('../models/user');
const chatHistory = require('../models/chatHistory');

class Dashboard{

    constructor(){}

    /**
     * The users who engaged with the bot.
     */
    async getUserEngagement(req, res) {
        let engagedUsers = await chatHistory.find().select('userid');
        let responseObj = {
            engaged_users: []
        };

        engagedUsers.forEach(user => responseObj.engaged_users.push(user.userid))

        let totalUserCount = await users.countDocuments();
        responseObj.engagedUsersCount = engagedUsers.length;
        responseObj.total_users_visited = totalUserCount;
        responseObj.engagementRate = (( engagedUsers.length * 100 ) / totalUserCount).toFixed(2) + '%';

        res.status(200).json(responseObj);
    }

    /**
     * The users who left the chat conversation in-between.
     */
    async getDropOffs(req, res) {
        let droppedUsers = await chatHistory.find({ connectionStatus: 'dropped' }).select('userid');
        let responseObj = {
            dropped_users: []
        };

        droppedUsers.forEach(user => responseObj.dropped_users.push(user.userid))

        let totalUserCount = await users.countDocuments();
        responseObj.droppedUsersCount = droppedUsers.length;
        responseObj.total_users_visited = totalUserCount;
        responseObj.dropOffRate = (( droppedUsers.length * 100 ) / totalUserCount).toFixed(2) + '%';

        res.status(200).json(responseObj);
    }

    /**
     * The users who completed the chat conversation
     */
    async getCompletedUsers(req, res) {
        let completedUsers = await chatHistory.find({ connectionStatus: 'completed' }).select('userid');
        let responseObj = {
            completed_users: []
        };

        completedUsers.forEach(user => responseObj.completed_users.push(user.userid))

        let totalUserCount = await users.countDocuments();
        responseObj.completedUsersCount = completedUsers.length;
        responseObj.total_users_visited = totalUserCount;
        responseObj.completionRate = (( completedUsers.length * 100 ) / totalUserCount).toFixed(2) + '%';

        res.status(200).json(responseObj);
    }

}

module.exports = new Dashboard();