import React, { Component } from 'react';
import AuthOptions from "./AuthOptions";
import './Header.css';

export default class Home extends Component {
    render(){
        return(
            <div id="background">
                <div className="m-top">
                    <h3 className="welcome-msg">Welcome to Blurter!</h3>
                    <h2><a className="homepage" href="./"> Home page </a></h2>
                    <div className="button-container">
                        <AuthOptions/>
                    </div>
                </div>
             </div>
        )
    }
}