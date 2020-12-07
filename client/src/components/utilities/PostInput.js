import React, { Component } from 'react';
import './PostInput.css';

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
        alert("A post was submitted: " + this.state.value);
        event.preventDefault();
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