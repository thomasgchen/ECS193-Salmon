import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../Navbar/Navbar';

export class Explorer extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <p>Explorer</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};
export default connect(mapStateToProps)(Explorer);
