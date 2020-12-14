
import React, { Component } from 'react';
import './PostInput.css';
import { css } from "@emotion/core";
import { BeatLoader } from 'react-spinners';
import UserContext from "../../context/userContext";

const override = css`
    display: block;
    border-color: red;
`;

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

    handleSubmit(event) {
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