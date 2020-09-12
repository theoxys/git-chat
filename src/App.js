import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import {IoIosChatboxes} from 'react-icons/io'
import {BiSearchAlt} from 'react-icons/bi'
import ChatListItem from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import {ChatWindow} from './components/ChatWindow';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {NewConversation} from './components/NewConversation';
import {LoginScreen} from './components/LoginScreen';
import {firebaseApp, Api} from './services/api'
import {BiLogOut} from 'react-icons/bi'
import ReactTooltip from 'react-tooltip'
import ReactLoading from 'react-loading'

function App() {

  const Alert = withReactContent(Swal)
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);

  const handleNewChat = () => {
    Alert.fire({
      title: 'Start a new conversation',
      html: <NewConversation user={user}/>,
      showCloseButton: true,
      focusCloseButton: false,
      showConfirmButton: false
    })
  }

  const handleLogOut = () => {
      Api.logout();
  }

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    firebaseApp.auth().onAuthStateChanged(async(resp)=>{
      if(resp){
        let newUser = {
          id: resp.uid,
          name: resp.displayName,
          avatar: resp.photoURL
        }
        await Api.addUser(newUser);
        setUser(newUser);
      }else{
        setUser(null);
      }

      setLoading(false);
    })
  },[])

  useEffect(()=>{
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub
    }
  }, [user]);

  if(loading){
    return(
      <div className="app-window" style={{justifyContent:'center', alignItems:'center'}}>
        <ReactLoading type={"spin"} color={'#dd7c4b'}/>
      </div>
    )
  }

  if(user === null){
    return(
      <LoginScreen />
    )
  }

  return (
  <div className="app-window">
    <div className="sidebar">
      <div className="header">
        <img className="avatar" src={user.avatar}></img>
        <div style={{fontWeight:700}}>{user.name}</div>
        <button className="icon-button">
          <IoIosChatboxes className="header-icon" onClick={handleNewChat} data-tip="Start new conversation"/>
          <ReactTooltip/>
          <BiLogOut className="header-icon" onClick={handleLogOut} data-tip="Logout"/>
          <ReactTooltip/>
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
        <ChatWindow
        user={user}
        data={activeChat}
      />
      }
      {activeChat.chatId === undefined && 
        <ChatIntro/>
      }
    </div>
  </div>
  );
}

export default App;
