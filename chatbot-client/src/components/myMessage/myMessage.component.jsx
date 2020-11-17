import React from 'react';
import './myMessage.component.scss';

export const MyMessage = props => (
    <div className={`pr-3 ${props.context} messages`}>
        <div className="animate__animated animate__fadeInUp animate__delay-1s message last">
            {props.message}
        </div>
    </div>
);