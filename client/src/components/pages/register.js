import React, {useState, useContext} from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";

export default function Register() {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [motto, setMotto] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {

        e.preventDefault();

        try {
            let newUser = { userName, motto, password, passwordCheck };
            await fetch("/users/register", {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newUser)
            });/*.then((response) => {
                if (response.ok) {
                    console.log(response.json());
                  } else {
                      throw new Error("Something went wrong...");
                  }
            });*/

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
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label htmlFor="register-email">Username</label>
                <input id="register-username" type="username" onChange={(u) => setUserName(u.target.value)}/>

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(p) => setPassword(p.target.value)}/>
                <input type="password" placeholder="Verify password" onChange={(pc) => setPasswordCheck(pc.target.value)}/>

                <label htmlFor="register-motto">Motto</label>
                <input id="register-motto" type="text" onChange={(m) => setMotto(m.target.value)}/>

                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}