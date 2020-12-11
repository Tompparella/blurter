import Main from "./components/pages/main";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/utilities/Header";
import React, { useState, useEffect } from 'react';
import UserContext from "./context/userContext";
import { token } from "morgan";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await fetch("/users/tokenIsValid", {
        method: "POST",
        redirect: "follow",
        headers: { 
            "x-auth-token": token
        } }
    );

    console.log(tokenRes);

    if (tokenRes.data) {
      const userRes = fetch("/users/", {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-auth-token": token
        }
      });
      setUserData({
        token,
        user: userRes.data
      });
    }
  }

  checkLogin();
  }, []);

  return <>
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header id="header"/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    </>
}

export default App;