import React, { useContext } from 'react';
import { useHistory} from "react-router-dom";
import UserContext from "../../context/userContext";

// The login- and register buttons that hover on top of the header.
export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    // Redirects the page to a corresponding page.
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        window.location.reload(false);
    };

    return (
        <div>
            {userData.user ? (
            <button onClick={logout}>Logout</button> ) : (
            <>
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
            </>
            )}
        </div>
    );
}