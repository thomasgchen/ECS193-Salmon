import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entries from '../Entries';
import Preview from '../Preview';

export class DataEntry extends Component {
  render() {
    return (
      <div style={{ margin: 0, overflow: 'hidden', height: '100vh', width: '100vw' }}>
        <div
          style={{
            height: '85%',
            width: '65%',
            overflow: 'scroll',
            paddingTop: '10px',
            paddingRight: '10xpx',
            display: 'inline-block',
            overflowX: 'hidden'
          }}
        >
          <Entries />
        </div>
        <div
          style={{
            height: '85%',
            width: '30%',
            overflow: 'hidden',
            paddingTop: '10px',
            paddingRight: '10xpx',
            display: 'inline-block'
          }}
        >
          <Preview />
        </div>
        <div style={{ backgroundColor: 'lightGrey', height: '15%' }}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};

export default connect(mapStateToProps)(DataEntry);
