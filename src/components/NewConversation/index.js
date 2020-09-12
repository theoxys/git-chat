import React, { useState, useRef } from 'react';
import './index.css';
import {BiSearchAlt} from 'react-icons/bi'
import { Api } from '../../services/api';
import Swal from 'sweetalert2';

export const NewConversation = ({user}) => {

    const [userList, setUserList] = useState([]);
    const input = useRef();

    const handleSearchUser = async() => {
        let newList = await Api.getContactList(input.current.value);
        setUserList(newList);
    }

    const handleNewChat = async (user2) => {
        console.log(user);
        console.log(user2);
        await Api.newChat(user, user2);
        Swal.close();
    }

    return(
        <div className="newchat-container">
            <div className="search">
                <BiSearchAlt color="white" style={{width:20, height:20}}/>
                <input type="search" 
                className="search-input" 
                placeholder="Search for users"
                onChange={handleSearchUser}
                ref={input}
                />
            </div>
            <div className="newchat-userlist">
                {userList.map((item, key)=> (
                    <div className="newchat-user" key={key} onClick={()=>handleNewChat(item)}>
                        <img className="newchat-avatar" src={item.avatar}></img>
                        <div className="newchat-name">{item.name}</div>
                    </div> 
                ))}
            </div>
        </div>
    )
}