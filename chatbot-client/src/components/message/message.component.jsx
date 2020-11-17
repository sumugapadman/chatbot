import React, { Component } from 'react';
import './message.component.scss';
import { MyMessage } from '../myMessage/myMessage.component';
import BotMessage from '../botMessage/botMessage.component';



class MessageComponent extends Component {

    constructor(){
        super();
    }

    renderMessage = (chat,key) => {
        if(chat.context === 'mine'){
            return <MyMessage key={key} message={chat.message} context={chat.context} timestamp={chat.timestamp}></MyMessage>;
        }else if(chat.context === 'bot'){
            return <BotMessage key={key} message={chat.message} context={chat.context} timestamp={chat.timestamp}></BotMessage>;
        }
    }

    render(){
        const chatMessages = [];
        this.props.chatMessages.map((chat, index) => {
            let msg = this.renderMessage(chat,index);
            index = index + 1;
            chatMessages.push(msg);
        });

        return (
            <div className="message-container pt-1">
                { chatMessages }
            </div>
        )
    }

}

export default MessageComponent;