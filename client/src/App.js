import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import DataEntry from './components/pages/DataEntry';
import Explorer from './components/pages/Explorer';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/entry" component={DataEntry} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default App;
