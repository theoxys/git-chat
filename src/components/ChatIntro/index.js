import React from 'react';
import './index.css'
import {RiWechatLine} from 'react-icons/ri'

export const ChatIntro = () => {

    return (
        <div className="chat-intro-container">
            <RiWechatLine color='white' style={{height: 120, width: 120}}/>
            <h1>Welcome to GitChat!</h1>
            <h2>Stay connected with your team anywhere on any browser!</h2>
        </div>    
    )
}