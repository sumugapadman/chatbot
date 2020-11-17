const socket = require('socket.io');
const jwtAuth = require('../helpers/jwtAuth');
const axios = require('axios');
const chatHistory = require('../models/chatHistory');
const chatMessage = require('../models/chatMessage');

class SocketService {

    constructor(server){
        this.io = socket(server);
        this.init();
    }
     
    init = () => {
        this.io.on("connection",(socket)=>{
            console.log('Socket Connection Estabished');
            this.message(socket);
            this.typing(socket);
            this.disconnect(socket);
        });
    }

    disconnect = (socket) => {
        socket.on("disconnect", async (data) => {
            console.log('User disconnected');
            if (socket.userid) {
                await chatHistory.findOneAndUpdate({ userid: socket.userid, connectionStatus: 'engaged' }, { connectionStatus: 'dropped' });
            }
        });
    }

    message = (socket) => {

        socket.on("message", async (data) => {
            let token = data.token;
            // verify token 
            let auth = new jwtAuth();
            let guestDetails = auth.decode(token);
            let audience = process.env.CLIENT_HOST_URL;
            auth.setOptions('finchatbot',guestDetails.payload.userid,audience);
            try{
                let result = auth.verifyToken(token);
                console.log(result);

                socket.userid = result.userid;

                // Store Message to User Chat Session
                let userChat = new chatMessage({
                    userid: result.userid,
                    jwt_token: token,
                    context: 'user',
                    message: data.message
                });
                let userChatHistory = await chatHistory.findOneAndUpdate({ userid: result.userid }, {$push: {chatMessages: userChat}}, { new: true, upsert: true });
                userChatHistory.connectionStatus = 'engaged';
                await userChatHistory.save();
                await userChat.save();

                // Send Message to Rasa Server for NLU
                let endpoint = process.env.RASA_HOST_URL+'/webhooks/rest/webhook'
                axios.post(endpoint, {
                    sender: token,
                    message: data.message
                }).then(res => {
                    res.data.forEach(async (data) => {
                        socket.emit('reply', data.text);
                        var botChat = new chatMessage({
                            userid: result.userid,
                            jwt_token: token,
                            context: 'bot',
                            message: data.text
                        });
                        await chatHistory.findOneAndUpdate({ userid: result.userid }, {$push: {chatMessages: botChat}});
                        botChat.save();
                    });
                }).catch(err => {
                    console.log(err);
                    socket.emit('reply', 'Oops!! An unexpected error occurred!!');
                });
            }catch(err){
                console.log(err.message);
                socket.emit("reply", 'JWT Authentication Failed !! Refresh your browser');
            }
            
        })
    }

    typing = (socket) => {
        socket.on("typing", (data) => {
            console.log(data);
        })
    }
}

module.exports = SocketService;