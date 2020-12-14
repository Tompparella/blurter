import React, { Component } from 'react';
import './profile.css';
import pic from '../../pictures/default.jpg';
import UserContext from "../../context/userContext";

export class Profile extends Component {
    static contextType = UserContext;
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            username: "Guest",
            motto: "I'm blurting!"
        };
    }

    updateState(user) {
        console.log(user);
        if (user.userData.user !== undefined && (user.userData.user.userName !== this.state.username)) {
            console.log("Update");
            console.log(user);
            this.setState({
                isLoaded: true,
                username: user.userData.user.userName,
                motto: user.userData.user.motto,
            });
            console.log(this.state);
        }
    }

    componentDidMount() {
        let user = this.context;
        console.log(user);
        if (user.userData.user !== undefined) {
            console.log(user);
            this.setState({
                isLoaded: true,
                username: user.userData.user.userName,
                motto: user.userData.user.motto
            });
            console.log(this.state);
        }
    }

    async componentDidUpdate() {
        if (!this.state.isLoaded){
            let user = this.context;
            this.updateState(user);
        }
    }

    render(){
        return(
            <div className="container">
                <div className="profile">
                    <img src={pic} alt='logo' className="pic"/>
                    <h2 className="name">{this.state.username}</h2>
                    <h3 className="motto">{this.state.motto}</h3>
                </div>
            </div>
        )
    }
}