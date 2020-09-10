import React, { useState } from 'react';
import './App.css';
import {IoIosChatboxes} from 'react-icons/io'
import {BiSearchAlt} from 'react-icons/bi'
import ChatListItem from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import {ChatWindow} from './components/ChatWindow';

function App() {
  const [chatList, setChatList] = useState([
    {chatId: 1, title: 'MatheusF', avatar: 'https://www.w3schools.com/howto/img_avatar.png'},
    {chatId: 2, title: 'Matheus', avatar: 'https://www.w3schools.com/howto/img_avatar.png'},
    {chatId: 3, title: 'Matheus', avatar: 'https://www.w3schools.com/howto/img_avatar.png'},
    {chatId: 4, title: 'Matheus', avatar: 'https://www.w3schools.com/howto/img_avatar.png'},
  ]);
  const [activeChat, setActiveChat] = useState({});

  return (
  <div className="app-window">
    <div className="sidebar">
      <div className="header">
        <div className="avatar"></div>
        <div style={{fontWeight:700}}>Nome Do Usuário</div>
        <button className="icon-button">
          <IoIosChatboxes color="white" style={{width:25, height:25}}/>
        </button>
      </div>
      <div className="search">
        <BiSearchAlt color="white" style={{width:20, height:20}}/>
        <input type="search" className="search-input" placeholder="Search for messages"/>
      </div>
      <div className="chat-list">
          {chatList.map((item, key) => (
            <ChatListItem key={key} 
            onClick={()=> {setActiveChat(chatList[key])}}
            active={activeChat.chatId === chatList[key].chatId}
            data={item}
            />
          ))}
        </div>
    </div>
    <div className="content">
      {activeChat.chatId !== undefined && 
        <ChatWindow/>
      }
      {activeChat.chatId === undefined && 
        <ChatIntro/>
      }
    </div>
  </div>
  );
}

export default App;
