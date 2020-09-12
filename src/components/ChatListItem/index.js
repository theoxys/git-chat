import React, { useEffect, useState } from 'react';
import './index.css';

const ChatListItem = ({onClick, active, data}) => {
  const [time, setTime] = useState('');

  useEffect(()=>{
    if(data.lastMessageDate > 0){
      let d = new Date(data.lastMessageDate.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0'+ minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  },[data])

  return (
    <div className={`chat-list-item ${active ? 'active' : ''}`} onClick={onClick}>
      <img className="chat-list-avatar" src={data.image}></img>
      <div className="chat-list-lines">
        <div className="chat-list-line">
          <div className="chat-list-name">{data.title}</div>
          <div className="chat-list-time">{time}</div>
        </div>
        <div className="chat-list-line">
          <div className="chat-list-msg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
