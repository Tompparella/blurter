import React, {useState, useContext} from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import "./authentication.css";

export default function Login() {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {

        e.preventDefault();

        try {
            let logUser = { userName, password };
            const loginRes = await fetch("/users/login", {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(logUser)
            }).then((response) => response.json())
            .then((responseData) => {
                return responseData;
            });

            if(loginRes.token === undefined) {
                alert(loginRes.msg);
                return;
            }

            setUserData({
                token: loginRes.token,
                user: loginRes.user
            });

            localStorage.setItem("auth-token", loginRes.token);
            history.push("/");
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return (
        <div className="page">
            <h2 id="page-title">Login</h2>
            <form id="inputForm" onSubmit={submit}>
                <label htmlFor="login-username">Username </label>
                <input id="login-username" type="username" onChange={(u) => setUserName(u.target.value)}/>

                <label htmlFor="login-password"> Password </label>
                <input id="login-password" type="password" onChange={(p) => setPassword(p.target.value)}/>

                <input id="submitBtn" type="submit" value="Login"/>
            </form>
        </div>
    )
}