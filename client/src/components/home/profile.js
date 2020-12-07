import React, { Component } from 'react';
import './profile.css';
import pic from '../../pictures/default.jpg';

export class Profile extends Component {
    render(){
        return(
            <div className="container">
                <div className="profile">
                    <img src={pic} alt='logo' className="pic"/>
                    <h2 className="name">Username</h2>
                    <h3 className="motto">Motto</h3>
                </div>
            </div>
        )
    }
}