import React, { Component } from 'react';
import './home.css';

export class Home extends Component {
    render(){
        return(
             <div className="m-top">
                <h3 className="welcome-msg">Welcome to Blurter!</h3>
                 <h2 className="homepage">Home page</h2>
             </div>
        )
    }
}