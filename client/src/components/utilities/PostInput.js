
import React, { Component } from 'react';
import './PostInput.css';
import { BeatLoader } from 'react-spinners';

export class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

        let fullDate = new Date();
        let newPost = {
            poster: "Guest",
            date: fullDate.getDate()+"/"+(fullDate.getMonth()+1) + "/" + fullDate.getFullYear(),
            time: fullDate.getHours() + ":" + fullDate.getMinutes(),
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
        });
    }
    render() {
        return (
            <div className="field-container">
                <form onSubmit={this.handleSubmit}>
                    <label>What's on your mind?</label>
                    <textarea className="inputField" type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input className="submitBtn" type="submit" value="Blurt"/>
                </form>
            </div>
        );
    }
}