import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entries from '../Entries';

export class DataEntry extends Component {
  render() {
    return (
      <div style={{ margin: 0 }}>
        <div style={{ backgroundColor: 'lightGrey', height: '15vh' }}>
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
        <div
          style={{
            height: '85vh',
            width: '55vw',
            overflow: 'scroll',
            paddingTop: '10px',
            paddingRight: '10xpx'
          }}
        >
          <Entries />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};

export default connect(mapStateToProps)(DataEntry);
