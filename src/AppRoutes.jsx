import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import Login from "./components/Login/Login";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeComponent} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
