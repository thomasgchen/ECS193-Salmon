import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction } from '../../redux/actions';

export class Explorer extends Component {
  render() {
    return (
      <div>
        <p>Explorer</p>
        <p>Test: {this.props.test}</p>
        <button
          onClick={() => {
            this.props.dispatch(testAction('test2'));
          }}
        >
          Test
        </button>
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
export default connect(mapStateToProps)(Explorer);
