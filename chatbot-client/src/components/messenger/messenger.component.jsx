import React, { Component } from 'react';
import './messenger.component.scss';
import ActionComponent from '../actions/actions.component';
import MessageComponent from '../message/message.component';
import config from "../../config/config.json";
import socketIOClient from "socket.io-client";
import SocketClient from '../../services/socketclient';

class Messenger extends Component {
    
    constructor(){
        super();
        this.endpoint = process.env.REACT_APP_API_URL || config.host+':'+config.app_server_port;
        this.state = {
            chatHistory : []
        }
    }

    componentDidMount(){
        this.initSocketConnection();
    }

    relay = (message) => {
        // Add messages to State & Push messages to UI screen 
        console.log('user-->'+message);
        let chat_message = {
            context : 'mine',
            message : message,
            token : localStorage.getItem('jwt_auth_token')
        }
        this.pushChatMessages(chat_message);
        // Push messages to server
        let socketService = new SocketClient(this.socket);
        socketService.sendMessage('message',message);
    }

    initSocketListeners = (socket) => {
        socket.on("reply",this.handleBotResponse);
    }

    handleBotResponse = (data) =>{
        // Add messages to state & Push messages to UI screen 
        console.log('bot-->'+data);
        let bot_message = {
            context : 'bot',
            message : data,
            token : localStorage.getItem('jwt_auth_token')
        }
        this.pushChatMessages(bot_message);
    }

    pushChatMessages = (chat_message) => {
        let chat_history = this.state.chatHistory;
        chat_history.push(chat_message);
        this.setState(chat_history);
    }

    initSocketConnection = async () => {
        const socket = socketIOClient(this.endpoint);
        this.socket = socket;
        this.initSocketListeners(socket);
    }

    render(){
        const { chatHistory } = this.state;
        return (
            <div className="messenger-container">
                <div className="chat-container">
                    <div className="chat-area">
                        <MessageComponent chatMessages={chatHistory}></MessageComponent>
                    </div>
                </div>
                <div className="chat-messenger">
                        <ActionComponent relayMessage={this.relay}></ActionComponent>
                </div>
            </div>
        )
    }
}

export default Messenger;