import React from 'react';
import './header.component.scss';
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = props => (
    <div className="row">
        <div className="col">
            <h1 className="text-center p-5 fin-title">
                <FontAwesomeIcon icon={faRobot}></FontAwesomeIcon> Chatbot</h1>
        </div>
    </div>
  );