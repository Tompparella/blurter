import Main from "./components/pages/main";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/utilities/Header";
import React, { useState, useEffect } from 'react';
import UserContext from "./context/userContext";

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
        }}).then((response) => response.json())
        .then((responseData) => {
            return responseData;
        });

    console.log("Token: " + tokenRes);

    if (tokenRes) {
      const userRes = await fetch("/users/", {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-auth-token": token
        }
      }).then((response) => response.json())
      .then((responseData) => {
          return responseData;
      });

      setUserData({
        token,
        user: userRes
      });
      //console.log("Userdata: " + userData.user.userName);
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