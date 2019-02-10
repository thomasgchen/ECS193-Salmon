import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entry from '../Entries';

export class DataEntry extends Component {
  render() {
    return (
      <div>
        <p>Entry</p>
        <Entry />
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/entry">Data Entry</Link>
          </li>
          <li>
            <Link to="/explorer">Data Explorer</Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};

export default connect(mapStateToProps)(DataEntry);
