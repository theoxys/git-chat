import React, { useState, useRef, useEffect } from 'react';
import './index.css'
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import {BiSend} from 'react-icons/bi';
import EmojiPicker from 'emoji-picker-react';
import {MessageItem} from '../MessageItem'
import { Api } from '../../services/api';


export const ChatWindow = ({user, data}) => {

    const body = useRef();
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const inputRef = useRef();
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = (body.current.scrollHeight - body.current.offsetHeight);
        }
    },[list]);

    useEffect(()=>{
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub
    }, [data.chatId])

    const handleEmojiClick = (e, emojiObject) => {
        inputRef.current.value = inputRef.current.value + emojiObject.emoji;
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(inputRef.current.value !== ''){
            Api.sendMessage(data, user.id, 'text', inputRef.current.value, users);
            inputRef.current.value = '';
            setEmojiOpen(false);
        }
    }

    return(
        <div className="chat-window-container">
            <div className="chat-header">
                <img className="chat-avatar" src={data.image} alt="" />
                <div className="user-name">{data.title}</div>
            </div>
            <div className="chat-body" ref={body}>
                {list.map((item, key)=>(
                    <MessageItem 
                    key={key}
                    data={item}
                    user={user}
                    />
                ))}
            </div>
            <div className="chat-emoji-container" 
            style={{height: emojiOpen? '200px':'0px'}} >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar={true}
                    disableSkinTonePicker={true}
                    preload={true}
                />
            </div>
            <form className="chat-footer" onSubmit={handleSendMessage}>
                <div className="chat-footer-input">
                    <HiOutlineEmojiHappy className="emoji-button" onClick={()=> {setEmojiOpen(!emojiOpen)}}/>
                    <input type="text" 
                    placeholder="Type a message!" 
                    className="msg-input"
                    ref={inputRef}
                    />
                </div>
                <div className="chat-footer-right" onClick={handleSendMessage}>
                    <BiSend color='white' style={{height: 30, width: 30}}/>
                </div>
            </form>
        </div>
    )
}