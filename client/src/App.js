import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Entry from './components/pages/Entry';
import Explorer from './components/pages/Explorer';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/entry" component={Entry} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default App;
