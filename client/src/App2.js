import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";

import Home2 from "./Home2";
import Register from "./Register2";
import Student from "./Student";
import Institute from "./Institute";

// import "./assets/scss/style.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home2} />
          <Route path="/register" exact component={Register} />
          <Route path="/student" exact component={Student} />
          <Route path="/institute" exact component={Institute} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
