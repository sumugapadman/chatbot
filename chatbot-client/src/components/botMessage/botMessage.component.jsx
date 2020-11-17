import React, { Component } from 'react';
import './botMessage.component.scss';

class BotMessage extends Component {
    constructor(props) {
        super(props);
        this.botMessage = React.createRef();
    }

    componentDidMount () {
        this.scrollToBottom()
    }
    componentDidUpdate () {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.botMessage.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
    
    render(){
        const { message } = this.props;

        return (
            <div ref={this.botMessage}>
                <div className="media">
                    <div className="w-15 d-inline-block animate__animated animate__fadeInUp animate__delay-1s">
                        <img className="align-self-center" src="https://robohash.org/111?set=set3&size=75x75" alt="Bot Avatar"/>
                    </div>
                    <div className="w-75 d-inline-block pr-2 media-body animate__animated animate__fadeInUp animate__delay-1s finbot-msg">
                        {message}
                    </div>
                </div>
            </div>
        )
    }

}

export default BotMessage;