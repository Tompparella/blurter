import Main from "./components/pages/main";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/utilities/Header";
import React from 'react';

function App() {
  return <>
    <BrowserRouter>
      <Header id="header"/>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </BrowserRouter>
    </>
}

export default App;