import React, { Component } from 'react';
import AuthOptions from "./AuthOptions";
import './Header.css';

export default class Home extends Component {
    render(){
        return(
             <div className="m-top">
                <h3 className="welcome-msg">Welcome to Blurter!</h3>
                <h2 className="homepage">Home page</h2>
                <div className="button-container">
                    <AuthOptions/>
                </div>
             </div>
        )
    }
}