import React, { useState } from 'react';
import './index.css'
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import {BiSend} from 'react-icons/bi';
import EmojiPicker from 'emoji-picker-react';

export const ChatWindow = () => {

    const [emojiOpen, setEmojiOpen] = useState(false);

    return(
        <div className="chat-window-container">
            <div className="chat-header">
                <img className="chat-avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                <div className="user-name">Matheus Pires</div>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-emoji-container" 
            style={{height: emojiOpen? '200px':'0px'}} >
                <EmojiPicker
                    disableSearchBar={true}
                    disableSkinTonePicker={true}
                    preload={true}
                />
            </div>
            <div className="chat-footer">
                <div className="chat-footer-input">
                    <HiOutlineEmojiHappy className="emoji-button" onClick={()=> {setEmojiOpen(!emojiOpen)}}/>
                    <input type="text" placeholder="Type a message!" className="msg-input"/>
                </div>
                <div className="chat-footer-right">
                    <BiSend color='white' style={{height: 30, width: 30}}/>
                </div>
            </div>
        </div>
    )
}