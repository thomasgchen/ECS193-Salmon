import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import DataEntry from './components/pages/DataEntry';
import Explorer from './components/pages/Explorer';
import Location from './components/pages/Location';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { BACKGROUND_COLOR } from './config/constants';
class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: BACKGROUND_COLOR }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Switch>
              <Route path="/entry" component={DataEntry} />
              <Route path="/explorer" component={Explorer} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/location" component={Location} />
              <Redirect from="/" to="dashboard" />
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
