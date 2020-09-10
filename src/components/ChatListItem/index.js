import React from 'react';
import './index.css';

const ChatListItem = ({onClick, active, data}) => {
  return (
    <div className={`chat-list-item ${active ? 'active' : ''}`} onClick={onClick}>
      <img className="chat-list-avatar" src={data.avatar}></img>
      <div className="chat-list-lines">
        <div className="chat-list-line">
          <div className="chat-list-name">{data.title}</div>
          <div className="chat-list-time">19:00</div>
        </div>
        <div className="chat-list-line">
          <div className="chat-list-msg">
            <p>Ola tudo bom ? me chamo Matheus</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
