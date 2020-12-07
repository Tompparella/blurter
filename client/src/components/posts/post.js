import React, { Component } from "react";
import './post.css';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            post: []
        }
    }

    componentDidMount() {
        fetch("/api/posts")
        .then(res => res.json())
        .then(post => this.setState({post}, () => console.log("Post fetched", post)));
    }

    render() {
        return (
            <div className="Post">
                <h2 className="main-header">Blurts</h2>
                <ul>
                    {this.state.post.map(post =>
                        <div className="post-container">
                            <li key={post.id}>{post.poster}
                            <li className="post-msg">{post.message}</li>
                            </li>
                        </div>
                        )}
                </ul>
            </div>
        );
    }
}

export default Post;
