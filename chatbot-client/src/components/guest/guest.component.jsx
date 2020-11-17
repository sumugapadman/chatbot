import React from 'react';
import './guest.component.scss';

export const GuestCard = props => (
    <div className="guest-container">
        <img src={`https://robohash.org/${props.avatarid}?set=set2`} className="rounded" alt="Guest User"/>
        <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">Guest : {props.avatarid}</li>
            <li className="list-group-item">IPv4 : {props.ip}</li>
            <li className="list-group-item">Timezone : {props.timezone}</li>
        </ul>
    </div>
);


