// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import React from 'react'

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Header from '../common/Header.jsx';
import Home from '../../components/home/index.jsx';

const Container = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Header>
            <Home />
          </Header>
        </Route>
      </Switch>
    </Router>
  )
}

export default Container