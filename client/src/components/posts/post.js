

import React, { Component } from "react";
import './post.css';
import UserContext from "../../context/userContext";

// Component that contains all 'Blurts' made by the webpages' users.
class Post extends Component {
    static contextType = UserContext;
    constructor() {
        super();
        this.state = {
            posts: [],
        }
    }

    // Function that allows users to delete their own posts.
    async deleteThisPost(currPost) {
        // Checking if there is a user and if the user matches the posts' creator. Guests can't delete posts.
            if ((this.context.userData.user !== undefined) && (currPost.creator === this.context.userData.user.userName)) {
                let posts = this.state.posts.filter(post => {
                    return post.id !== currPost.id;
                });
                this.setState({
                    posts: posts
                });

                let postToBeDeleted = {
                    id: currPost.id
                }
                try {
                    await fetch("/posts/delete", {
                        method: "POST",
                        redirect: "follow",
                        headers: { 
                            "x-auth-token": this.context.userData.token,
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(postToBeDeleted)
                    }).then((response) => {
                        console.log(response);
                    })
                    ;
                } catch (error) {
                    console.log(error);
                }
            } else if (this.context.userData.user === undefined) {
                alert("Guest users can't delete posts. Please register or login to gain access to this feature.");
            }
             else {
                alert("You can only delete your own posts!");
            }
    }

    // Finds all 'Blurts' saved in the database.
    componentDidMount() {
        fetch("/posts/find", {
            method: "GET"
        }).then((response) => {
            response.json().then((data) => {

                if (data == null) {
                    console.log("No posts found");
                    return;
                }
    
                let len = data.length;
                for (let i=(len-1); i>=0; i--) {
                    let post = {
                        creator: data[i].creator,
                        date: data[i].date,
                        time: data[i].time,
                        message: data[i].message,
                        id: data[i]._id
                    };
                    this.setState({
                        posts: this.state.posts.concat(post)
                    })
                }

            });
        });
    }

    render() {
        return (
            <div className="Post">
                <h2 className="main-header">Blurts</h2>
                <ul>
                    {this.state.posts.map(post =>
                        <div className="post-container" key={post.id}>
                            <li className="post-name" key={post.creator}>{post.creator}</li>
                            <li className="post-date" key={post.date}>{post.date}</li>
                            <li className="post-time" key={post.time}>{post.time}</li>
                            <button className="deleteBtn" onClick={() => {this.deleteThisPost(post)}}>X</button>
                            <li className="post-msg" key={post.message}>{post.message}</li>
                        </div>
                        )}
                </ul>
            </div>
        );
    }
}

export default Post;
