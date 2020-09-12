import React from 'react';
import {FaFacebook} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';
import {RiWechatLine} from 'react-icons/ri';
import {Api} from '../../services/api';
import './index.css';

export const LoginScreen = ({onReceive}) => {

    const handleGithubLogin = async() => {
        let result = await Api.githubLogin();
        if(result){
            console.log(result.user);
        }else{
            alert('Erro!');
        }
    };

    const handleFacebookLogin = async () => {
        let result = await Api.facebookLogin();
        if(result){
            console.log(result.user);
        }else{
            alert('Erro!');
        }
    };

    return(
        <div className="login-container">
            <div className="login-box">
                <RiWechatLine color='white' style={{height: 120, width: 120}}/>
                <h1>Welcome to GitChat!</h1>
                <button className="login-button" onClick={handleGithubLogin}>
                    <FaGithub className="login-button-icon"/>
                    Enter with GitHub
                </button>
                <button className="login-button" onClick={handleFacebookLogin}>
                    <FaFacebook className="login-button-icon"/>
                    Enter with Facebook
                </button>
            </div>
        </div>
    )
}