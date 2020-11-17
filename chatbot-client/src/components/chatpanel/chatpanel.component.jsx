import React from 'react';
import { GuestCard } from '../guest/guest.component';
import Messenger from '../messenger/messenger.component';
import './chatpanel.component.scss'

export const ChatPanel = props => (
    <div className="card fin-chat-container">
         
        <div className="card-body pt-0">
            <div className="row">
                <div className="col-md-auto">
                    {props.guest.map(user => (
                        <GuestCard key={user.userid} avatarid={user.avatarid} ip={user.ip} timezone={user.timezone}>
                        </GuestCard>
                    ))}        
                </div>
                <div className="col-sm pt-3">
                    <Messenger></Messenger>
                </div>
            </div>
        </div>
    </div>
);