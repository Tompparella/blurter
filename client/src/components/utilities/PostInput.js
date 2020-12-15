
import React, { Component } from 'react';
import './PostInput.css';
import { css } from "@emotion/core";
import { BeatLoader } from 'react-spinners';
import UserContext from "../../context/userContext";

const override = css`
    display: block;
    border-color: red;
`;

// The component that allows users to make new 'Blurts'. 
export class PostForm extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // Submits the created 'Blurt'. If the user's not logged in, gives the post default information as Guest user.
    handleSubmit(event) {
        if (this.state.value.length > 10 && this.state.value.length <= 500) {
            let creator = "Guest";
            if (this.context.userData.user !== undefined) {
                creator = this.context.userData.user.userName;
            }
            this.setState({loading: true});
            let fullDate = new Date();
            let minutes = fullDate.getMinutes();
            console.log(parseInt(minutes));
            if (parseInt(minutes) < 10) {
                minutes = "0" + minutes;
            }
            let newPost = {
                poster: creator,
                date: fullDate.getDate()+"/"+(fullDate.getMonth()+1) + "/" + fullDate.getFullYear(),
                time: fullDate.getHours() + ":" + minutes,
                msg: this.state.value
            };
            console.log(JSON.stringify(newPost));

            // Posts the new 'Blurt' to the database.
            fetch("/posts/post", {
                method: "POST",
                redirect: "follow",
                headers: { 
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newPost)
            }).then((response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
                this.setState({loading: false});
            });
        } else alert("The Blurt must be between 10 to 500 characters long!");
    }
    render() {
        return (
            <div>
                <div className="field-container">
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <label>What's on your mind?</label>
                        <textarea className="inputField" type="text" value={this.state.value} onChange={this.handleChange}/>
                        <input className="submitBtn" type="submit" value="Blurt"/>
                    </form>
                </div>
                <div className="loading">
                    <BeatLoader
                        css={override}
                        size={25}
                        color={"white"}
                        loading={this.state.loading}
                    />
                </div>
            </div>
            
        );
    }
}